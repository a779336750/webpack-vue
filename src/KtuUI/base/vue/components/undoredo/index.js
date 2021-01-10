class KtuHistory {
    constructor(data) {
        // 创建一个空的历史操作，只是一个占位，方便计算
        this.steps = this.createEmptySteps();
        this.maxHistoryStep = 1000;
        // 当前操作到列表中的哪一个记录
        let currentStep = 0;
        Object.defineProperty(this, 'currentStep', {
            get() {
                return currentStep;
            },
            set(newValue) {
                currentStep = newValue;
                Ktu.store.commit('data/changeState', {
                    prop: 'needCheckStep',
                    value: true,
                });
            },
        });
    }
    // 创建一个空历史堆栈，里面有一个占位的空白操作记录，方便前进和后退的计算
    createEmptySteps() {
        const blankStep = {};
        return [blankStep];
    }
    // 为添加进来的每一个历史操作的对象注入两个方法，用于存放前进后退的对象
    assignAction(action) {
        return _.assignIn(action, {
            beforeChange(beforeData) {
                this.beforeData = _.cloneDeep(beforeData);
            },
            afterChange(afterData) {
                this.afterData = _.cloneDeep(afterData);
            },
        });
    }
    // 是否有撤销记录
    undoAble() {
        return this.currentStep > 0;
    }
    // 是否有前进记录
    redoAble() {
        return this.currentStep < this.steps.length - 1;
    }
    // 撤销
    undo() {
        const historyStep = this.loadStep(this.currentStep);
        historyStep.backRun();
        this.loadStep(this.currentStep - 1);
    }
    // 前进
    redo() {
        const historyStep = this.loadStep(this.currentStep + 1);
        historyStep.run(false);
    }
    // 加载历史记录，获取action
    loadStep(step) {
        step = Math.max(0, Math.min(this.steps.length, step));
        this.currentStep = step;
        return this.steps[this.currentStep];
    }
    // 添加历史记录
    addStep(action) {
        const oneHistoryStep = this.assignAction(action);
        this.steps.splice(this.currentStep + 1, this.steps.length - this.currentStep - 1, oneHistoryStep);

        if (this.steps.length > this.maxHistoryStep) {
            this.steps.shift();
        }

        this.currentStep = this.steps.length - 1;

        return oneHistoryStep;
    }
    // 清楚全部记录
    clearAll() {
        this.steps = this.createEmptySteps();
        this.currentStep = 0;
    }
}

export default KtuHistory;