<template>
    <Row class="header-nav">
        <Col span="12" class="nav-left">
            <a class="nav-item logo" @click="showExitTipsModal">
                <icon id="#svg-logo" v-if="!isOem"/>
                <div class="oem-logo" v-else>
                    <img :src="oemCropLogo" v-if="!!oemCropLogo">
                    <svg v-else>
                        <use xlink:href="#svg-oem-logo"></use>
                    </svg>
                </div>
                <span class="logo-right-text">图片旋转裁剪</span>
            </a>
            <Modal v-model="isShowExitTips" class="exit-tips-modal">
                <p class="exit-tips">离开该页面将会失去您对图片的修改，确定关闭？</p>
                <div class="confirm-btns">
                    <button class="confirm" @click="exitPage">确定</button>
                    <button class="cancel" @click="cancelExit">取消</button>
                </div>
            </Modal>
            <div class="nav-item undo-redo">
                <Tooltip content="Ctrl+Z" placement="bottom">
                    <Button
                        type="text"
                        icon="#svg-nav-back"
                        :disabled="!undoable"
                        :class="{disabled: !undoable}"
                        @click="undo"
                    >后退</Button>
                </Tooltip>
                <Tooltip content="Ctrl+Y" placement="bottom">
                    <Button
                        type="text"
                        icon="#svg-nav-forward"
                        @click="redo"
                        :disabled="!redoable"
                        :class="{disabled: !redoable}"
                    >前进</Button>
                </Tooltip>
            </div>
            <template v-if="!isEmpty && isFreeCut && isCutBoxShow">
                <div class="split"></div>
                <div class="cut-type">自由裁剪</div>
                <div class="size-form">
                    <input
                        type="text"
                        :placeholder="width"
                        @keyup.enter="numberEnter"
                        class="num"
                        :value="width"
                        @focus="numberFocus($event, 'width')"
                        @blur="numberBlur($event, 'width', 0, maxImgWidth)"
                    />
                    <span>×</span>
                    <input
                        type="text"
                        :placeholder="height"
                        @keyup.enter="numberEnter"
                        class="num"
                        :value="height"
                        @focus="numberFocus($event, 'width')"
                        @blur="numberBlur($event, 'height', 0, maxImgHeight)"
                    />
                </div>
            </template>
        </Col>
        <Col span="12" class="nav-right">
            <Modal v-model="isShowSaveModal" class="save-elements-modal" @on-cancel="cancelSave">
                <div class="download-content" :style="saveContentStyle">
                    <div class="download-title downloaded-title">
                        <span class="title">保存</span>
                    </div>
                    <template v-if="isSaving">
                        <Downloading :loadingType="2" :size="105"></Downloading>
                        <div class="generating-tips">正在保存到你的素材...</div>
                    </template>
                    <template v-if="isFull">
                        <div class="elements-full"></div>
                        <p class="full-tips" v-if="version !== 5">保存失败，“我的素材”容量已满，升级版本即可获取更多容量</p>
                        <p class="full-tips" v-else>保存失败，“我的素材”容量已满，请联系客服反馈情况</p>
                        <div class="close-button">
                            <div class="button clean" @click="toUpgrade" v-if="version !== 5">前往升级</div>
                            <div class="button clean" @click="cancelSave" v-else>我知道了</div>
                            <div class="button upload" @click="showDownloadModal">下载到本地</div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="downloaded-imgbox">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyRkE5MzQ2MTBGRjExRUFBMUNCRkYxM0JFRjRDOTAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyRkE5MzQ3MTBGRjExRUFBMUNCRkYxM0JFRjRDOTAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzJGQTkzNDQxMEZGMTFFQUExQ0JGRjEzQkVGNEM5MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzJGQTkzNDUxMEZGMTFFQUExQ0JGRjEzQkVGNEM5MDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6j93OhAAAZZElEQVR42uydC7Ab1XnHv7O7essP4gcYGy5ObbApYFrA2CadYgYGGh7JTJKSgRLCEKYUphCaxxSadtwEypRO47hOGgJpacIkpInJNA6kNCFQTDEJJjEYYmyMM2BeNsY4tu9DV9Ke0+/ornRXq7N7zkorXe3qfOZjV8+rPfvTX//z7dmzhDEGOnQkJQzdBDo00Dp0aKB16NBA69ChgdahgdahQwOtQ4cGWocODbQOHRpoHQMYlm6CZMTIyzdG9l6FE7+mFVqHDg20Dh0aaB06NNA6NNA6dGigdejQQOvQoYHWoUMDrfc3JtFA60hKzMKcneQN1Ie+BysWOsv9Aw20HieQmPgjZ/mMthw64h4m5p87aWqgdcQ9bsBc7ORfaA+tI65BHFVe67rvK5hVzG9gtjV1Fl1zXe/Vd829GugBjBTmDMwTMVdifhLzFIH9+Dom7xz9B+ZmzF2YhzArWqH7KOhXbg3+ln/6zqQDzZXXxjyI+RrmNswlgn3Nn7fVec7vnNdUteXQ0W/BHJh5voS5AfOfMB/GPNZ5zluYF2M+pzuF8YjjMX+KecRZHj/gkHNwP+ryyx9LIsxJVuh/wzzfWb8A81uYqwcc6qcdlU47nhk00HK1Z+32miOOFZ7bq7QTqcUjfbJ/YmE5+mmcwC88tzdrlhvtsFkDrRYLYXKswFTHtZiPYo44y09qlmvxupOJjSgtRz+NE9jjeGcdzXEw6ZYjKqDr4wR48KNQ9pT95CS/ztxJ2EnfwKiAro8T4MHHCXxVs9Pb0KMYo/HQfJzA9dA6TuB6SPiZETqSodADPU5AR2QiSvtFob3jBLaC+Ph/IscJ6Igkpjmi2BcKLRon8GUYkHECOiKJ9znLQ914c+J3JVn2nauU32T0rOn8SNxTzs1z8lsO6wMZOsRc7cqeyxdkcemJtqG98v6udQpr4QDMBwH9VMOsQxKnOdkXliMoNkLCi/Y6IonVTnFgfb8DvXkAgO51KTJR7Yl2owgToyAZX0fbMRz134hyLEeSxgkQnwz7fNWM6nP0e3wKs+hUOj7VjT8QJdD16kcSIO4WuN0APS7qPAcXt7nuug3vi3x0ZmSWAzuDdkwhDvMYaeM5KnaChLAYLODvsT6FmZ9U8F3MOa67+foD+NjFaD3K/eih24rRM6Y37wrm2kPMb8kkjzt7mrXel335SBiIScj1doGu3/aCTTzPYxKAG49VWY6ptknodq6/D/+Jn1aSwczHyX8HJs8gcge/byM+5wqE+r1EAN2rCAGyaN1vKYNbpr5Mss4EUAd9ASZ3LBkjTWD3XpVzuLga8+8w5wU89ULMF/H5X8TltxDsMQ10EMg7fUH2U9agZct9lVm5E5hpLGPATiaMvB8fGUK85mDyI2JZXBYxx/mPES4PYfITdw/j8jWg7Lf4RtuJzZ63Rsde9dFKN9REwVY0PW4ZDth298BGGPMwccbSCZinYn4A808wZyq+BQeej/+5E9/rJzBxkO4FTN4mBxDyUQ00p2nHEZnHVYV3EuDZuQXUMi4AQvjP5UrE52gF95px8ijXfefge0y81CRQKeb3AT+RlbJHiU1/Zo2PvyEAWwS5kmpb5hjpBtQIIHG2jUPHv6x7MX/jQMpP+lCdR4/3wfhwie3Oexx23jODf2MMoWYDC3TupY5BboK4elRmup2zPgQGuQoxWYVJutAF41+MDyPkH2amySr5/BaE+0HDtr9rVsrvCYBmEpVuAZtDXSOnEh3YDmj16tYBmBzDcweCeJxjOa4N6Fvw1/Oz9P8e3+sN7aHdIG+X2gsVJW5keV7+dGYZf4nrl2Gz53pcfVmOcC+npvVFzB8RSr9qlUu/9gDNFH1202NmygG73F1/jYDy4xLXIdh88Nr3HCV3B7diH8fn/VdUfzMxE83kfuOryjIVJk47NHJ8fn7F+PHFjSxl/B8+ejl/+yncNA7BnzJibKqk8xurqewK7+f1bAeRfHEnwU6P9aSO7QB7reCha6KEOTFAB8DsBzARQGGW5+UWl4aKDyDIP8dnnNeHm3oegv3zair/gG1mFzv+VAQ2EdyGKYaal+5+7LprI973QNR/J/ZA5148QkKosiFKu2DlSkOFW2nW/CU+69IYbPalCPYvq1buVkbMnADsIJhb1NrMjPXqiOPtrvU7uvEHjATCHKTKpEWVFxROr8zNbsIO320Cj9fPgZ+V3GYbmU22kV3WqVr3AmpUZD7FxQ6ezroGugHzC0dU6si+qsz34fgJxetppmYvTo7x9/rkmg0xctf7KLVMrSehzvZEqfm4+Z91682thMMsUinDnpHKV2Zn1+H65QnpE3O1vqtKcmcYrHKzAdVRV5WDSqofTVUQDrU91tXqx6+62RCxAzq37bDMZoDPT21NrapzMrOrM9IP1MpiyRu9fTklqYXAyBUGVPa7YGaKcE9Anesq1Du62QBGQmF2/9Q2fnor83ILqjPT/4P3LofkxnIK1iM2Sy8Q2A73OgR66lzX7McbTg420LnnlWAW1WVrfrkyL3ucPc3i4wQWQfJjEQPzJwj1kMdXEwHY/lDnS92AesTJwQVaAWbis8PqNmOuXUz9ANeHYHBiCKH+EWWpeZJOYq+hPkIWlw4NLNC550J55iZV5mlPTxWrR6W/h48shcGLhZRZP8ScXm8PiTqLoS5EBzXCTLu5wXEr2/mNRxYqM0sbqcox2W/iI38IgxtLUaXvYUBSIC/n+bVxbKKvgRaoMwRUMloPZQ/lP4ePXAQ6LrLtzOfB/4iiAbJD5IUS0UB3AvPWw7LToUgA1Ob4wsJqZpLPapYbTfYZm2bOE9gOA/xPzm22HsX+hzouloNIQG6CuTorPYtmjfWgp/RtakPGjPWUpmYFVD6knUQNdDTqDCAfm9HYSZXZaT7w5RjNcEsczaj1D6I2A8WpFPpdpeOg0H5wi7wzWo38ajDIRzW7vvERWs2sBvm4D9k+0ECrRL5ZnUONaWZpI0Oz5pc0s8GB1uN2YCQDarXpFuvRzyodF4UmkqpGrcY6PpT7BD5yokZWGottO/MJaK1NK1sPDbSKOv/6sMocF0Koad7Ms1Tt/D8dSjJNbmLUKEBwCc/XehjT+lOl+12h1Qfqz8/+me4IhusgUjt9pUShIW4q3TdAS9Q58FxAZhIL1flazWholcY2IxaoncIVC5XuZ4Umiv7ZKA/lzq/NWKQjbAzRSvoCkB89jI1KG30KspJvrndqWNr4iGaz7YrHlQGdw9iV8foC6PyvDhNF79wCtT3DmoGW43yNZtvxx8y2jg6h0H0Nt9FnMJMQMNdUpTonw6cdyGgu2w6T2tZFHpU2FaAm/Qj1VAItaxQ/mN0/jSZNkw9qJjvuHF4IaiPxVAaMDRTQsoYJLM15FMSkebMIBlmuiew4ljNqFEVtDMEHXWRC1POwRl6+UWwFutvRC/qGB82l4W5oszo3zWFOJ6R35ixBMoluVzhJo48+mxjlx0A8GaT3DHD3WSdBE6+HudRGLBTa75tKINyQ0BaY+ZeRpo0zYg9xPcO+JvpqBz+rx/K0scqkkH6ncalwEL1Cu9Z55+oWzLP4jdGzpm/BxZfzWw4/FKEqqw48EkJcWZBbZBfMVfiMk/CRxYyQU2OvyL6PS3SNvz5KtWbkCns8y9tzF/7dncS0Nxupyi7Bp6ortOGj4DLFZr0Amk+i9zeex/gQw9UI9h0I9Rd6BLO382eOLyosY1nj48wgF+Pt+S0/z0kBubFJBMyhVWDMW4atYAE9sBvoK/8LMD7i816RQT0DoeaXkvgA/yysaoFdMd8Ewh4mhH3fyJa3CmwEFWyFG1rSa6jJ8M4bLoHmaU5FcRlC/eMugAyikhwziTm+pHAJs4zP4L2nR3kVLLE/ZfLXStdZ48pQvs+hrOV+UnMQjo0w05BacSMYc5un2mOjB6Dy2F0AIwcnG7HpskLEeT8fHx6mTfzb+Tl88T+bufJDuLQdmKkLbL+thwAf3RbYsovX/5XCe9zSIcyqczQbpaXFlaVTpz3B0sb9NZgTUxpjLbuSg8zAgdxAmFfe1AJzrfHys8A640pg4Hp+7+N0oOR+eyTzBB3NrAT5pJAqp3JF7qv5hzhT4XlndggzyCoY1bnp4ujp09bRrPHf+KzTElUUE8FcB7OmzClIrUKY55zkv6OOOQUNYqY9Px5tnMYoeYQOZ9exslkMqEZJZzvtBtSqVQ4SEcxChS6dVFhSnp99HAxyDSToMhlSmPn/6socAPNECxpArKzzFlPeeSD4Ea5h46nH6Uh6SUiF7irU/EM8q/C8LW10CJVOah07pXguLZqPJXJmIynMcmVuvHTsIDA+g5bznoz1RY94KdjGY3Q4cy6EO+m2ayU8/ofXKjxvraI6qxzxa+TYqcXLWMbYgOvTBgdm1oA5vfJmMGafpPR29osbsetF+3FLp6G33oBQX6pgP2RHGCMBmlcvgq53cYdPhSMMzC3qXPr94mrs+P07xGRgEUnPAPPoFWANfRDzIjDn/AGfHVwJ5snOX/0C2Q7McxRh3v4w2Ls3tVcO7E1kEOr76JGWs8nDzvlBogCaB68zfwjzcZic7vRxp1z3hQ5gFl827aT8Epozvg0xOWxdg/mYVUBys2telteHSXE+WMeeAyRVkMLcVBrkMK9QV+YqwlzZ9qCnANaXBfg0Qv1t1uyp27EfHUHtPlK40claIMjteGbv/S01Zvt9qYJdtO7D9elxcQ/GUbiPDMEVfq0cmPNWgP32L4CVh7sCc/X5DRCjk66ns6pxH5TNC0jaHnbuqx9VdF9NwM2I6jXM1YAunPg18S/YlqvarWp4IW4a9lkeyt4etw4gyRwV0IIO1G9uBiiPNMPMPDCfHQbmhxDmB30+EBEcfyP9otxLWSn1JQT6sy4u3FB74Y70aGKnJTKVwfkNmEtLCmcyk1wduw4etYMfRy9tHrsSwLEfDZihE5g3dKGo1asOMVxNh9NneSofPTlJwOgQYGXfDAaxaNG8C2JYZ6Zj++SdMa7UHGqrEC3M8YTagKrxj7j9Vgd+mvQCaBnsvkM+S0vzF+Kjy+JYgaO/2wmsMiKUoqYGqEG9AjuK+fZh3vYDz+4krlXichh9T/gyOpypnwkTNBQ14m9SZ1ZDdSIYg+bMT0Ncwx4He+/TPlBPsl2zGhzq+auAZGdCejnCPCsszK6mbbQmafbKIk/dl+1Gbg6h0JEcdDHagFgF6uYZQRfnT4v9ZSHsUjPULR0w1+10AdIrPqcO80suZa4DSurqTFrVOT7+4ww2kj4N1ObPi6SEF1WnMMhuGLRgfgySEBzqfU9PlOh8W8SYsB2FucowV7ZtaAa5DrNXoRvLGPUPq7WpjQ0F2zElnUKVykbrVF0WuQSSElWXUntH/dZhzs1SeqsKh/mFDQ6/zdpAfKxGizr3u5dm5DKQTzUWWcWj3dF2QZdUayrXlYeyi/DWvMQAza1GA+rhJsdhzFqqDHPNZnhhdhSaEFeTk8mmJnVfHReYJ+IYNppaLCjfyS4t1xbcnZTtlBSaTrNWQRKjglC/XbcfE+f3GTPUpter7kBlfnGDx0bUYSauDuHkekxhdmyHsTKkQve0bKc8TZdjN06GpAYqdfUtDjXaDzODW29qmMUVoJNBPndeJJNCdtIpDLIcrgMqsDCZNDMX1JuBjR2QHlGs7hxAmCd89PtBbUamyEbbRQGzcAA/M8jxSWW5UbnjUL++Cez9LyjATDwwE3WY49tex4HaCQAdQ22EhBcg+FrbrWU7AjMT1SH0o9suQ2XrPWDve87zMIXK9h9iPuiqL7thBnWYSWzpLiqW7YiEOWlYHSizrMJRzyIMSnCon10P1ZmLwJj5e2hBKmDv3QZs+B0BlKRRuwDiakr+HyOt481EI+ziEwXwn4GJCmBue0ip1cGH9IPamwkPp93J5Cp97xWgB3ZNCrhbWZlrHAZzwezswgbMkBiYIYANP5h76qFVxnFMAs5gNDnsNh+pazoW4mqWxkERz4ERUvfLjUy0zXDHKMjHcUTio7vZKTQcoA8lV5kFdzmQTq46ILt8c+MLMBgw8+0aBvU6dM8GJ3n/mMp4aEIYeyfRhoN4fLCn0wciRSbNz080zBPeaj+o1Z2nZDw0gTATyVTZnuQKNPGBmjQPNPJCDZPryYe5trl7INxEND0Zy0FCVDwmd2WZvZxASW5pBuIBtUWNBSALD5okDeYaZWwntDerUmi4oxw+KoTaPFTZmugCBzSX3JpKcCCwHOBS5bgfAVRtphR9HtqbIqxnncIgqJv2aOrt8qvYMTyQWJV2s1v/R5qBJe5/ZAAsRnO8R7LVVyF4mGikc9tF0cUPHP5nlOiTCe0N+lQ5XNWNJgui+D5JCpNtUuyHQRRw9+TAh3mw8miCSxztvzbpMNd+ou2e7vueAJ16c3wHsdnuxEKtCmeY5yaibdgraDd2JA7oCZWu/mfydyAJzgEL7Ax+v+cFlTZf53fKM/N5jKVfHXsKVXoP6BgUdd5D8pWngpiQsDRlCu13gZjmD82AWvvKd0Pch9noUGKCZOxvgPhiQkzCzpRaDr9vnjDRS79olOgmvb8THgbbhN75BRkPUSpzWKCZRJmD0n3pL5p5ZfQetB579V5PqtWAvUahfC+IL/smgzvImkSu0EHXoVOFmpESHUWlXou3ynrvJy7KJFtZiwo9Itr3ijCHhtgdYQf4iy57GwSxMK13yrtpxlhfnZu+BQbiJICBCEoy1fUkbe8O2vchFNoXarrmumZVXnNvpB5aajOctN3L9OulZ6x3K/WOg464w5y270bf/IxoX4ewH/6g7cqmMddh8mEU72GuA8ElTawOIQZFmN1Qm/Vl+rWxJ9FPj1fmpm+AmFxvRYfAZqSr/6oAswxqkMDN5xa/yXWbr49h/nXUVY4wMNueDbZTb5SeRbW+E8F+V7MRuw7gu+iZ70SYnxXt2zah9gvRNVKu66RTCAHfpCDv7LehjbT2l3dnd4ysMUp0i6YkJmGwZ438+BrHM9s+SQPAlqlz16+xIqtsqKozz6r3NhmnR7Lbh+9O7R1fh2q9XxPTr6rM9qPF+BejMP51hPqIaF/6gB3WeniX9ws+zTfb8dDuyoZftcMNteEBuX5SpO1ZVkEw4Dv19vi21L7yjsr8zCp7ZuoiZpI5mqI+AdmijxjpymbcU2Vn/1VdEFd9YBaBzXxUOkiZP+8wUrceHPC/jaJTqFLhIAKAg0Bu/sJQBqnXS0+iv366Oie9xJ6ROpvmTD4TfE6T1dMYIwbdRkz6DElVX/IB2C/97IdK+a71+7S4xL9E/BIXN7NdWd8P3G6VA2ByUhAvyO4Zcdww+4HsN/S9dj1h653ydswd+AwLFft4e5q1mKXJPJYyFqB6H6uZi1SF3yKEvYFN/zYx7V2Ye5z9RgW2ohoCbDfMTNFL+/tkV925U6BVDqxQF9z1DRHNnBMMc3Py+T2oebDyW8xXof1z0wZnDCdx2pF01CcS9YO8Kl1RtBxhDrC03Sm02gBZRaXdtkM2Y7usDMjTO2tlzy6GnrCQDfv16+DbEoWuhLAdQR6640FL7VqOIJWmHtCoB2w/AGUKETS/sJ9Ca6D94fBTaL+jvGEth+2xHCoK3ZE6d9opdMPtp9B1lQYFewEhgJYptFZqdWUOYze8QNsCda74KHRQya4jiNsFWmQ7iOADUR+ltEE+hxn1aVRb244ptRs0AGiZ1aABUKsMH+2JQvvZDu9PF3hUOqjzR53Pw1y+2Z12gO0AiHiONG03AhXaltShvWB3vTMYteXwNg5VACqoMa0AdQ5znQ4NsxrUKkD7VTqClqqHvafEcogAFk1QXfe7XrBlpTkqqGzUQW4HaBnMZACgDVuuUwVadJi7CsHjOSgED/qHXpbtwii0W6WDwGY+G+hWZRnQXZuWdQDVWdYp9BtopuKZZSBPmUKLOocisL0dRFGDmj5g12F2H2n06xAGXXgmCGYyQPAGQR1k+0Qdw6DRkyKQbc/7qII8ZWU7kfXw2hBv1cPbkIZnow0BzLYEZq3O0am0KtR+g/lVzlKBbpTsoqpyBPlpr6+mAbbDcC3ddWc7wDcbIdSZaIg7UmkaYEWCzh8Mcx7hlFY52oGaSLwbE8ArsxodX9tuQAFX7RwyH0g7AbkrMEfdKfSDmoH4unSiRhTBLLMZYe0GGTBwO+0cisCWrYs6gdBtmKPy0GE8td916dyvoR7bQULCrD10eA+tArUf4CxESS5yz9zNTiGEsB9euJlnSaH1wox+NkOP4+jMS7MAPy0CVAavykQykVU1uqXQMqi9Yz78lJb5rBMfddfq3B2VVlXssBB3FeaoLUc7Sq0KNyjaDDLAnrkdT63SQVSd7k1mLboOczc8NBNA5PXSxOfnjwQADG16Zg1zuBKeH9Sqt6dElbvdKezEV7MAS6EKsoa4feuhakNUAe4pzN0EOghqkKi0dwmgVbkf1DoMvEzxb8YKaD8LIgNbpOZRgzyoYzk6BVsG7pSB3CugVcEGxc4jk0Cp1Tm6jmK7t6cE5F4DLQNbZeP9zjxX+ULoaA+6dj3wlO0Hqw8akUTUKGxA7UU3bEgU1mWggJY1BJminaIj5m1qJaDBtAInHNIkAK0VWEdboS/YoyNRQRjTAqdDK7QOHRpoHTo00Dp0aKB1aKB16NBA69ChgdahQwOtQ4cGWocGWocODbQOHRpoHTo00Dp0BMb/CzAAQjTpaSSn5bMAAAAASUVORK5CYII="
                                alt
                            />
                        </div>
                        <p class="downloaded-tips">图片已保存到你的素材</p>
                        <p class="repeat-tips" @click="gotoManageElements">点击此处查看</p>
                        <div class="close-button">
                            <div class="button" @click="isShowSaveModal = !isShowSaveModal">确认</div>
                        </div>
                    </template>
                </div>
            </Modal>
            <Button type="default" icon="#svg-nav-upload" class="upload" @click="upload">上传</Button>
            <Modal v-model="isShowUploadTips" class="exit-tips-modal" @on-cancel="cancelUpload">
                <p class="exit-tips">该操作将会覆盖当前图片，是否继续？</p>
                <div class="confirm-btns">
                    <button class="confirm" @click="confirmUpload">确定</button>
                    <button class="cancel" @click="cancelUpload">取消</button>
                </div>
            </Modal>

            <input
                @change="fileChange($event)"
                ref="addPicHeader"
                id="addPicHeader"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                style="display:none;"
            />
            <Button
                type="default"
                icon="#svg-save-elements"
                class="save-element"
                :class="{disabled:isEmpty}"
                @click="saveToMyImgs"
            >保存为素材</Button>
            <Button
                type="default"
                icon="#svg-nav-download"
                class="download"
                :class="{disabled:isEmpty}"
                @click="showDownloadModal"
            >下载</Button>
            <Modal v-model="isShowDownload" class="download-modal" @on-cancel="exitModal">
                <img
                    style="display: none;"
                    src="data:image/png;base64,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"
                    alt
                />
                <div class="download-content" :style="downloadContentStyle">
                    <template v-if="!isDownloaded">
                        <div class="download-title">
                            <span class="title">下载</span>
                        </div>
                        <div class="download-format">
                            <div
                                class="button"
                                :class="{selected: downloadForm === 'png'}"
                                @click="chooseForm('png')"
                            >PNG</div>
                            <div
                                class="button"
                                :class="{selected: downloadForm === 'jpg'}"
                                @click="chooseForm('jpg')"
                            >JPG</div>
                        </div>
                        <div class="download-button">
                            <div class="button" @click="download">点击下载</div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="download-title downloaded-title">
                            <span class="title">下载</span>
                        </div>
                        <template v-if="isGenerating">
                            <Downloading :loadingType="2" :size="105"></Downloading>
                            <div class="generating-tips">图片正在生成中...</div>
                            <div class="close-button">
                                <div class="button" @click="cancelDownload">取消</div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="downloaded-imgbox">
                                <img
                                    src="data:image/png;base64,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"
                                    alt
                                />
                            </div>
                            <p class="downloaded-tips">图片已打包自动下载至本地</p>
                            <div class="download-content">
                                找不到下载文件?
                                <span
                                    class="download-line-height look-help"
                                    @click="toHelp"
                                >查看帮助</span>
                                或
                                <span
                                    class="download-line-height repeat-tips"
                                    @click="download"
                                >重新下载</span>
                            </div>
                            <div class="safariTips" v-if="isSafari">下载文件为.dms格式无法打开？可手动修改后缀，或改用谷歌浏览器</div>
                            <div class="close-button">
                                <div class="button" @click="closeDownloadModal">关闭</div>
                            </div>
                        </template>
                    </template>
                </div>
            </Modal>
        </Col>
    </Row>
</template>

<script lang="ts">
    import Downloading from './common/Downloading.vue';
    import UploadSetting from '../mixins/UploadSetting';
    import DataHandler from '../mixins/DataHandler';
    import Utils from '../base/global/utils';
    import {Vue, Component, Mixins, Watch} from "vue-property-decorator";
    import CutBox from "../base/cutbox";
    import Background from "../base/background";
    @Component({
      name: 'TheHeader',
      components: { Downloading },
    })// 组件在此添加
    export default class TheHeader extends Mixins(UploadSetting,DataHandler)  {
        private isDownloaded: boolean =  false;
        private isGenerating: boolean =  true;
        private isSaving: boolean =  false;
        private isFull: boolean =  false;
        private isShowDownload: boolean =  false;
        private isShowExitTips: boolean =  false;
        private isShowSaveModal: boolean =  false;
        private isShowUploadTips: boolean =  false;
        private currentStep:number = 0;
        private downloadForm:string = 'png';
        private uploadPosition:string = '编辑器顶栏';
        private isOem: boolean = false;
        private oemCropLogo:string = "xxx";
        private ktuVipLink:string = `//xxx/marketing/product.jsp?pdt=ktu`;
        private oemVipLink:string = `//xxx/portal.jsp#appId=shop&tab=12`;
        private fileChageEvent:any = null;

        get version():number {
            return 5;
        }
        get saveContentStyle():object {
            if (this.isSaving) {
                return { height: `328px` };
            }
            if (this.isFull) {
                return { height: `394px` };
            }
            return { height: `491px` };
        }
        get downloadContentStyle():object {
            if (!this.isDownloaded) {
                return { height: `266px` };
            } else if (this.isGenerating) {
                return { height: `360px` };
            } else if (this.isSafari) {
                return { height: `493px` };
            }
            return { height: `453px` };
        }
        get isFreeCut():boolean {
            return this.cutBox.proportion === 0;
        }
        get isCutBoxShow():boolean {
            return this.cutBox.isShow;
        }

        get isSafari():boolean {
            return Utils.BrowserType() === 'Safari';
        }
        get cutBox():CutBox {
            return this.$store.state.data.ktuData.cutBox;
        }
        get background():Background {
            return this.$store.state.data.ktuData.background;
        }
        get maxImgWidth():number {
            return this.background.width - this.cutBox.left / window.Ktu.edit.editScale;
        }

        get maxImgHeight():number {
            return this.background.height - this.cutBox.top / window.Ktu.edit.editScale;
        }

        get isEmpty():boolean {
            return Utils.isEmptyObject(this.$store.state.data.ktuData);
        }

        get width():number {
            return Math.floor(Number(this.cutBox.width / window.Ktu.edit.editScale));
        }
        set width(val) {
            window.Ktu.page.saveState();
            this.changeCutBoxProp('proportion', 0);
            this.cutBox.setSize({ width: val * window.Ktu.edit.editScale });
            window.Ktu.page.modifiedState();
        }
        get height():number {
            return Math.floor(Number(this.cutBox.height / window.Ktu.edit.editScale));
        }
        set height(val) {
            window.Ktu.page.saveState();
            this.changeCutBoxProp('proportion', 0);
            this.cutBox.setSize({ height: val * window.Ktu.edit.editScale });
            window.Ktu.page.modifiedState();
        }

        get needCheckStep():boolean {
            return this.$store.state.data.needCheckStep;
        }
        get undoable():boolean {
            return this.currentStep > 0;
        }
        get redoable():boolean {
            return this.currentStep < (window.Ktu.historyManager ? window.Ktu.historyManager.steps.length - 1 : 0);
        }
        get isShowDownloadTips():boolean {
            return this.$store.state.data.isShowDownloadTips;
        }
        set isShowDownloadTips(value) {
            this.$store.state.data.isShowDownloadTips = value;
        }
        get isDownloadTips():boolean {
            return this.isShowDownload && !this.isGenerating && this.isDownloaded;
        }

        @Watch('isDownloadTips')
        onIsDownloadTipsChanged(val:boolean) {
            this.isShowDownloadTips = val;
        }
        @Watch('needCheckStep')
        onNeedCheckStepChanged(val:boolean) {
            if (val) {
                this.currentStep = window.Ktu.historyManager.currentStep;
                this.$store.commit('data/changeState', {
                    prop: 'needCheckStep',
                    value: false,
                });
            }
        }
        @Watch('isOffLineClose')
        onIsOffLineCloseChanged(val:boolean) {
            if (val) {
                this.closeDownloadModal();
                this.isShowSaveModal = false;
                val = !val;
            }
        }

        public toHelp(): void {
            window.open(this.isOem ? 'https://adm.webportal.top/sys/view.jsp?id=1426' : 'https://docs.qq.com/doc/DT3lySmRkSnR6cmhw', '_blank');
        }

        public toUpgrade(): void {
            window.open(this.isOem ? this.oemVipLink : this.ktuVipLink, '_blank');
        }
        public cleanElements(): void {
            window.open(`//xxx/sheji.html#/m/material`);
        }
        public cancelSave() {
            this.isShowSaveModal = false;
            this.isFull = false;
        }
        public gotoManageElements() {
            window.open(`//xxx/sheji.html#/m/material`);
        }

        public async saveToMyImgs(): Promise<any> {
            const imgForm = window.Ktu.ktuData.background.imgType.indexOf('png') > 0 ? 'png' : 'jpg';
            const proportionList = ['自由裁切', '1:1', '2:3', '4:3', '7:5', '16:9', '9:19.5', '小1寸', '黄金比例'];
            if (!navigator.onLine) {
                this.$Message.error('网络中断，请稍后再试!');
                this.isShowSaveModal = false;
                return;
            }
            if (this.isEmpty) return;
            this.isShowSaveModal = true;
            this.isSaving = true;
            // 隐藏掉裁剪框，保存当前显示的内容
            window.Ktu.page.saveState();
            this.cutBox.hide();
            this.cutBox.switchProportion(0);
            await this.cutBox.cutImg();
            window.Ktu.page.modifiedState();
            await window.Ktu.page.saveToMyImgs().then(() => {
                if (!navigator.onLine) {
                    window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
                    this.$store.state.data.isOffLineClose = true;
                    return;
                }
                setTimeout(() => {
                    if (!navigator.onLine) {
                        window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
                        this.$store.state.data.isOffLineClose = true;
                        return;
                    }
                    this.isSaving = false;
                }, 800);
            })
                .catch((e:any) => {
                    this.isSaving = false;
                    if (e == '上传资源已超过容量限制。') {
                        this.isFull = true;
                    } else if (e == '登录失效，请重新登录') {
                        this.isShowSaveModal = false;
                    } else {
                        this.isShowSaveModal = false;
                        this.$Message.warning({
                            content: e,
                            duration: 3,
                        });
                    }
                });
        }
        public upload() {
            (this.$refs.addPicHeader as HTMLElement).click();
        }
        public async confirmUpload(e:any) {
            this.isShowUploadTips = false;
            await this.dealFile();
            // 重置value,避免选中同一文件时无法触发onchange事件
            this.fileChageEvent.target.value = null;
        }
        public cancelUpload() {
            // 重置value,避免选中同一文件时无法触发onchange事件
            this.fileChageEvent.target.value = null;
            this.isShowUploadTips = false;
        }
        public async fileChange(e:any) {
            this.files = e.target.files;
            if (!this.isEmpty) {
                this.isShowUploadTips = true;
            } else {
                this.dealFile();
            }
            this.fileChageEvent = e;
        }
        public numberEnter(e:any) {
            e.target.blur();
        }
        public numberBlur(e:any, type:string, min:number, max:number) {
            let num = Number(e.target.value.replace(/[^\d]/g, ''));
            if ((`${e.target.value}`)[0] === '-') {
                num = 0 - num;
            }
            if (num > max) num = max;
            if (num < min) num = min;
            let unit = '';
            switch (type) {
                case 'margin':
                    unit = 'px';
                    break;
                case 'opacity':
                    unit = '%';
                    break;
                case 'angle':
                    unit = '°';
                    break;
                case 'scale':
                    unit = '%';
                    break;
                case 'marginFull':
                    unit = 'px';
                    break;
                case 'opacityFull':
                    unit = '%';
                    break;
                case 'angleFull':
                    unit = '°';
                    break;
                case 'scaleFull':
                    unit = '%';
                    break;
                default:
                    unit = '';
                    break;
            }
            e.target.value = num + unit;
            if(this[type]) {
                this[type] = (num + unit).toString();
            }
        }

        public mousedownBlur(e:any) {
            if (e.target != this.currentFocus) this.currentFocus.blur();
            document.body.removeEventListener('mousedown', this.mousedownBlur);
        }
        public numberFocus(e:any, type:string) {
            this.currentFocus = e.target;
            let num = Number(e.target.value.replace(/[^\d]/g, ''));
            if ((`${e.target.value}`)[0] === '-') {
                num = 0 - num;
            }
            document.body.addEventListener('mousedown', this.mousedownBlur);
            e.target.value = num;
        }
        public activateUpload() {
            (this.$refs.uploadPic as HTMLElement).click();
        }
        public showDownloadModal() {
            if (this.isEmpty) return;
            this.isShowSaveModal = false;
            this.isShowDownload = true;
        }
        public undo() {
            window.Ktu.historyManager.undo();
        }
        public redo() {
            window.Ktu.historyManager.redo();
        }
        public chooseForm(form:string) {
            this.downloadForm = form;
        }
        public async download() {
            if (!navigator.onLine) {
                this.$Message.error('网络中断，请稍后再试!');
                return;
            }
            const proportionList = ['自由裁切', '1:1', '2:3', '4:3', '7:5', '16:9', '9:19.5', '小1寸', '黄金比例'];
            this.isDownloaded = true;
            this.isGenerating = true;
            // 隐藏掉裁剪框，保存当前显示的内容
            window.Ktu.page.saveState();
            this.cutBox.hide();
            this.cutBox.switchProportion(0);
            await this.cutBox.cutImg();
            window.Ktu.page.modifiedState();
            setTimeout(() => {
                this.$nextTick(async () => {
                    if (!navigator.onLine) {
                        this.$Message.error('网络中断，请稍后再试!');
                        this.closeDownloadModal();
                        return;
                    }
                    let config;
                    try {
                        config = await window.Ktu.page.download(this.downloadForm);
                    } catch (err) {
                        console.log(err);
                        this.closeDownloadModal();
                        return;
                    }
                    if (!this.isCancelDownload) {
                        Utils.downloadHref(config.name, config.src);
                        this.isGenerating = false;
                        this.isDownloaded = true;
                    } else {
                        this.isCancelDownload = false;
                    }
                });
            }, 500);
        }
        public cancelDownload() {
            this.isCancelDownload = true;
            this.isDownloaded = false;
            this.isGenerating = false;
        }
        public closeDownloadModal() {
            this.isDownloaded = false;
            this.isShowDownload = false;
            this.isGenerating = false;
        }
        public exitModal() {
            this.isDownloaded = false;
            this.isGenerating = false;
        }
        public showExitTipsModal() {
            if (Utils.isEmptyObject(window.Ktu.ktuData)) {
                this.exitPage();
            } else {
                this.isShowExitTips = true;
            }
        }
        public exitPage() {
            window.location.href = `//xxx/tools.html`;
            this.isShowExitTips = false;
        }
        public cancelExit() {
            this.isShowExitTips = false;
        }

    }
</script>
