let hx = require('hbuilderx');

/**
 * @description 插件设置界面
 * @param {Object} config
 */
function getUIData(config) {

	let {selectedType, accessToken, ApiKey, proxy} = config
	
    let uiData = {
        title: "ChatGPT插件设置",
        subtitle: "HbuilderX-ChatGPT编程助手插件设置",
        formItems: [
            {
                type: "radioGroup",
                name: "ApiType",
                label: "API类型",
                value: selectedType,
                items: [
                    {label: "chatGPT-accessToken",id: "accessToken"},
					{label: "openAI-ApiKey",id: "ApiKey"}
                ]
            },
			// {type: "label",name: "selectedText",text: `<p style="color: gray;">您选择的单选框是: ${selectedType}</p>`},
			{
			    type: "input",
			    name: "accessTokenInput",
			    label: "accessToken",
			    placeholder: "chatGPT-accessToken(推荐)",
			    value: accessToken,
			    disabled: !(selectedType=="accessToken")
			},
			{
			    type: "input",
			    name: "ApiKeyInput",
			    label: "ApiKey",
			    placeholder: "openAI-ApiKey(付费、容易被封)",
			    value: ApiKey,
			    disabled: !(selectedType=="ApiKey")
			},
			{
			    type: "input",
			    name: "proxy",
			    label: "proxy",
			    placeholder: "系统代理，支持http/https",
			    value: proxy,
			    disabled: false
			}
        ]
    }
    return uiData;
};

function showSettingDialog(provider) {
    // 获取默认UI数据
	let config = hx.workspace.getConfiguration("chatgpt");
	let extensionConfig = {
		selectedType: config.get('selectedType',"accessToken"),
		accessToken:config.get('accessToken',""),
		ApiKey: config.get('ApiKey',""),
		proxy: config.get('proxy',"")
	}
    let uidata = getUIData(extensionConfig);

    return hx.window.showFormDialog({
        ...uidata,
        width: 480,
        height: 280,
        submitButtonText: "提交(&S)",
        cancelButtonText: "取消(&C)",
        validate: function(formData) {
            // if (!formData.projectName) {
            //     this.showError("普通输入框不能为空，请填写");
            //     return false;
            // };
            return true;
        },
        onOpened: function() {},
        onChanged: function(field, value) {
            if (field == "ApiType") {
				extensionConfig.selectedType = value
                let updateData = getUIData(extensionConfig);
                this.updateForm(updateData);
            };
        }
    }).then((res) => {
		let config = hx.workspace.getConfiguration('chatgpt');
		config.update("proxy", res.proxy)
		config.update("selectedType", res.ApiType).then(() => {
			console.log(hx.workspace.getConfiguration('chatgpt').get("selectedType"))
			if(res.ApiType == "accessToken"){
				config.update("accessToken", res.accessTokenInput).then(() => {
					provider.updateConfig()
				})
			}else{
				config.update("ApiKey", res.ApiKeyInput).then(() => {
					provider.updateConfig()
				})
			}
			hx.window.showInformationMessage("更新配置成功");
		})

		return(res)

    }).catch((res)=>{
		console.log(res)
	});

};

module.exports = showSettingDialog;