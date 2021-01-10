<style lang="scss" scoped>
.alert-list {
    margin-bottom: 10px;
    overflow: hidden;
}
</style>

<template>
    <div class="Alert">
        <h2>Alert 警告提示</h2>

        <div class="view-list">
            <h3>简单类型</h3>
            <Alert type="info">消息提示文案</Alert>
            <Alert type="success">成功提示文案</Alert>
            <Alert type="warning">警告提示文案</Alert>
            <Alert type="error">错误提示文案</Alert>
        </div>

        <div class="view-list">
            <h3>分段提示</h3>
            <Alert>
                消息提示
                <template slot="desc">消息提示消息提示消息提示</template>
            </Alert>

            <Alert type="success">
                成功提示
                <template slot="desc">成功提示成功提示成功提示 </template>
            </Alert>

            <Alert type="warning">
                警告提示
                <template slot="desc">
                    警告提示警告提示警告提示警告提示
                </template>
            </Alert>

            <Alert type="error">
                错误提示
                <span slot="desc">
                    错误提示错误提示错误提示 <Icon
                        type="help-circled"
                        size="14"
                    ></Icon>
                </span>
            </Alert>
        </div>

        <div class="view-list">
            <h3>带图标</h3>
            <Alert
                type="info"
                show-icon
            >消息提示</Alert>
            <Alert
                type="success"
                show-icon
            >成功提示</Alert>
            <Alert
                type="warning"
                show-icon
            >警告提示</Alert>
            <Alert
                type="error"
                show-icon
            >错误提示</Alert>

        </div>

        <div class="view-list">
            <h3>分段显示，带图标</h3>
            <Alert show-icon>
                消息提示文案
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <Alert
                type="success"
                show-icon
            >
                成功提示文案
                <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
            </Alert>
            <Alert
                type="warning"
                show-icon
            >
                警告提示文案
                <template slot="desc">
                    警告的提示描述文案警告的提示描述文案警告的提示描述文案
                </template>
            </Alert>
            <Alert
                type="error"
                show-icon
            >
                错误提示文案
                <span slot="desc">
                    自定义错误描述文案。
                </span>
            </Alert>
            <Alert show-icon>
                自定义图标
                <Icon
                    id="#svg-alert-setting"
                    slot="icon"
                ></Icon>
                <template slot="desc">自定义图标文案自定义图标文案自定义图标文案自定义图标文案自定义图标文案</template>
            </Alert>
        </div>

        <div class="view-list">
            <h3>带关闭按钮</h3>

            <Alert closable>An info prompt</Alert>

            <Alert
                show-icon
                closable
            >An info prompt</Alert>

            <Alert
                type="success"
                show-icon
                closable
            >
                A success prompt
                <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span>
            </Alert>

            <Alert
                type="warning"
                closable
            >
                Custom closing content
                <span slot="close">No longer prompt</span>
            </Alert>
        </div>

        <div class="view-list">
            <h3>banner 类型</h3>

            <Alert
                banner
                type="warning"
            >Notice: notification contents...</Alert>
            <Alert
                banner
                closable
                type="warning"
            >Notice: notification contents...</Alert>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
