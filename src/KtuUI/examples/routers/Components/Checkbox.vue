<template>
    <div class="Checkbox">
        <h2>Checkbox 多选框</h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <Checkbox v-model="single">Checkbox</Checkbox>
            </template>

        </div>

        <div class="view-list">
            <h3> 组合使用 </h3>

            <template>
                <CheckboxGroup v-model="social">
                    <Checkbox label="twitter">
                        <icon id="#svg-type-web"></icon>
                        <span>Twitter</span>
                    </Checkbox>
                    <Checkbox label="facebook">
                        <icon id="#svg-type-web"></icon>
                        <span>Facebook</span>
                    </Checkbox>
                    <Checkbox label="github">
                        <icon id="#svg-type-web"></icon>
                        <span>Github</span>
                    </Checkbox>
                    <Checkbox label="snapchat">
                        <icon id="#svg-type-web"></icon>
                        <span>Snapchat</span>
                    </Checkbox>
                </CheckboxGroup>

                <CheckboxGroup v-model="fruit">
                    <Checkbox label="香蕉"></Checkbox>
                    <Checkbox label="苹果"></Checkbox>
                    <Checkbox label="西瓜"></Checkbox>
                </CheckboxGroup>
            </template>

        </div>

        <div class="view-list">
            <h3> 不可用 </h3>

            <template>
                <Checkbox v-model="disabledSingle" disabled>Checkbox</Checkbox>
                <CheckboxGroup v-model="disabledGroup">
                    <Checkbox label="香蕉" disabled></Checkbox>
                    <Checkbox label="苹果" disabled></Checkbox>
                    <Checkbox label="西瓜"></Checkbox>
                </CheckboxGroup>
            </template>
        </div>

        <div class="view-list">
            <h3> 与其它组件通信 </h3>

            <template>
                <Checkbox v-model="checked" :disabled="disabled">
                    <span v-if="checked">Checked</span>
                    <span v-else>Unchecked</span>
                    -
                    <span v-if="!disabled">Usable</span>
                    <span v-else>Disabled</span>
                </Checkbox>
                <br>
                <Button type="theme" @click="checked = !checked">
                    <span v-if="!checked">Checked</span>
                    <span v-else>Unchecked</span>
                </Button>
                <Button type="theme" @click="disabled = !disabled">
                    <span v-if="disabled">Usable</span>
                    <span v-else>Disabled</span>
                </Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 全选 </h3>

            <template>
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox label="香蕉"></Checkbox>
                    <Checkbox label="苹果"></Checkbox>
                    <Checkbox label="西瓜"></Checkbox>
                </CheckboxGroup>
            </template>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                single: false,
                social: ['facebook', 'github'],
                fruit: ['苹果'],
                disabledSingle: true,
                disabledGroup: ['苹果'],
                checked: true,
                disabled: false,
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜']
            };
        },
        methods: {
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>