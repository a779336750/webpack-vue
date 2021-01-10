<style lang="scss" scoped>
.input-wrapper {
    margin: 20px 0;
}
</style>

<template>
    <div class="Input">
        <h2> 输入框 Input </h2>

        <div class="view-list">
            <h3>简单样式</h3>
            <Input
                v-model="value"
                placeholder="Enter something..."
                style="width: 300px"
            />
        </div>

        <div class="view-list">
            <h3>不同大小</h3>
            <template>
                <Input
                    v-model="value1"
                    size="large"
                    placeholder="large size"
                />
                <br>
                <Input
                    v-model="value2"
                    placeholder="default size"
                />
                <br>
                <Input
                    v-model="value3"
                    size="small"
                    placeholder="small size"
                />
            </template>
        </div>

        <div class="view-list">
            <h3>清除样式</h3>
            <template>
                <Input
                    v-model="value1"
                    placeholder="Enter something..."
                    clearable
                    style="width: 200px"
                />
            </template>
        </div>

        <div class="view-list">
            <h3>带图标</h3>
            <template>
                <Input
                    v-model="value1"
                    icon="svg-close-2"
                    placeholder="Enter something..."
                    style="width: 200px"
                />
            </template>
        </div>

        <div class="view-list">
            <h3>带图标 前缀和后缀图标</h3>

            <template>
                <div>
                    Props：
                    <Input
                        prefix="svg-close-2"
                        placeholder="Enter name"
                        style="width: auto"
                    />
                    <Input
                        suffix="close-2"
                        placeholder="Enter text"
                        style="width: auto"
                    />
                </div>
                <div style="margin-top: 6px">
                    Slots：
                    <Input
                        placeholder="Enter name"
                        style="width: auto"
                    >
                    <icon
                        id="#svg-close-2"
                        slot="prefix"
                    ></icon>
                    </Input>
                    <Input
                        placeholder="Enter text"
                        style="width: auto"
                    >
                    <icon
                        id="#svg-close-2"
                        slot="suffix"
                    ></icon>
                    </Input>
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3>自带搜索按钮</h3>

            <template>
                <div>
                    <Input
                        search
                        placeholder="Enter something..."
                    />
                    <Input
                        search
                        enter-button
                        placeholder="Enter something..."
                    />
                    <Input
                        search
                        enter-button="Search"
                        placeholder="Enter something..."
                    />
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3>文本框</h3>
            <template>
                <Input
                    v-model="value5"
                    type="textarea"
                    placeholder="Enter something..."
                />
                <Input
                    v-model="value6"
                    type="textarea"
                    :rows="4"
                    placeholder="Enter something..."
                />
            </template>
        </div>

        <div class="view-list">
            <h3>自动适应高度的文本框</h3>
            <template>
                <Input
                    v-model="value7"
                    type="textarea"
                    :autosize="true"
                    placeholder="Enter something..."
                />
                <Input
                    v-model="value8"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder="Enter something..."
                />
            </template>
        </div>

        <div class="view-list">
            <h3>不可输入的文本框</h3>
            <template>
                <Input
                    v-model="value9"
                    disabled
                    placeholder="Enter something..."
                />
                <Input
                    v-model="value10"
                    disabled
                    type="textarea"
                    placeholder="Enter something..."
                />
            </template>
        </div>

        <div class="view-list">
            <h3>复合型输入框</h3>
            <template>
                <Input v-model="value11">
                <span slot="prepend">http://</span>
                <span slot="append">.com</span>
                </Input>
                <br>
                <Input v-model="value12">
                <Select
                    v-model="select1"
                    slot="prepend"
                    style="width: 80px"
                >
                    <Option value="http">http://</Option>
                    <Option value="https">https://</Option>
                </Select>
                <Select
                    v-model="select2"
                    slot="append"
                    style="width: 70px"
                >
                    <Option value="com">.com</Option>
                    <Option value="org">.org</Option>
                    <Option value="io">.io</Option>
                </Select>
                </Input>
                <br>
                <Input v-model="value13">
                <Select
                    v-model="select3"
                    slot="prepend"
                    style="width: 80px"
                >
                    <Option value="day">Day</Option>
                    <Option value="month">Month</Option>
                </Select>
                <Button
                    slot="append"
                    icon="ios-search"
                ></Button>
                </Input>
            </template>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            value1: "",
            value2: "",
            value3: "",
            value5: "",
            value6: "",
            value7: "",
            value8: "",
            value9: "",
            value10: "",
            value11: "",
            value12: "",
            value13: "",
            select1: "http",
            select2: "com",
            select3: "day"
        };
    }
};
</script>

