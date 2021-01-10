<style lang="scss" scoped>
    .demo-carousel{
        height: 200px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e;
    }
</style>

<template>
    <div class="Carousel">
        <h2>Carousel 走马灯</h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <div style="width: 400px;">
                    <Carousel v-model="value1" loop>
                        <CarouselItem>
                            <div class="demo-carousel">1</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">2</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">3</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">4</div>
                        </CarouselItem>
                    </Carousel>
                </div>
            </template>

        </div>

        <div class="view-list">
            <h3> 自动切换 </h3>

            <template>
                <div style="width: 400px;">
                    <Carousel autoplay v-model="value2" loop>
                        <CarouselItem>
                            <div class="demo-carousel">1</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">2</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">3</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">4</div>
                        </CarouselItem>
                    </Carousel>
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3> 综合设置 </h3>

            <template>
                <div style="width: 400px;">
                    <i-switch v-model="setting.autoplay">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                    
                    <i-switch v-model="setting.radiusDot">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>

                    <Slider v-model="setting.autoplaySpeed" :min="300" :max="10000" :step="100"></Slider>

                    <RadioGroup v-model="setting.dots" type="button">
                        <Radio label="inside">interior</Radio>
                        <Radio label="outside">exterior</Radio>
                        <Radio label="none">Don't show</Radio>
                    </RadioGroup>
                    
                    <RadioGroup v-model="setting.arrow" type="button">
                        <Radio label="hover">Hover displayed when</Radio>
                        <Radio label="always">Always show</Radio>
                        <Radio label="never">Don't show</Radio>
                    </RadioGroup>
                    
                    <RadioGroup v-model="setting.trigger" type="button">
                        <Radio label="click">Click</Radio>
                        <Radio label="hover">Hover</Radio>
                    </RadioGroup>

                    <Carousel
                        v-model="value3"
                        :autoplay="setting.autoplay"
                        :autoplay-speed="setting.autoplaySpeed"
                        :dots="setting.dots"
                        :radius-dot="setting.radiusDot"
                        :trigger="setting.trigger"
                        :arrow="setting.arrow">
                        <CarouselItem>
                            <div class="demo-carousel">1</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">2</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">3</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">4</div>
                        </CarouselItem>
                    </Carousel>
                </div>
            </template>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                value1: 0,
                value2: 0,
                value3: 0,
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                }
            };
        }
    };
</script>