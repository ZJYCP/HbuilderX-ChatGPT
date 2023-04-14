const path = require('path');

const vueFile = path.join(path.resolve(__dirname), 'static', 'vue.min.js');
const customCssFile = path.join(path.resolve(__dirname), 'static', 'custom.css');
const markedFile = path.join(path.resolve(__dirname), 'static','vendor', 'marked.min.js');
const elementFile = path.join(path.resolve(__dirname), 'static','vendor', 'element.js');
const elementCssFile = path.join(path.resolve(__dirname), 'static', 'vendor', 'element.css');
const hightLightFile = path.join(path.resolve(__dirname), 'static','vendor', 'highlight.min.js');
const hightLightCssFile = path.join(path.resolve(__dirname), 'static', 'vendor', 'highlight.min.css');
const mainFile = path.join(path.resolve(__dirname), 'static', 'main.js');



function Html(projectData) {
	return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="${customCssFile}">
			<link rel="stylesheet" href="${elementCssFile}">
            <link rel="stylesheet" href="${hightLightCssFile}">
        </head>
        <body>
			<div id="app" v-cloak class="app">
				<div class="content scroll-container">
					<div v-for='(v,k,i) in list' :key='k' class="conversition" v-focus>
						<div class="question-block"><strong>You：</strong> <i>{{v[0]}}</i></div>
						<div class="response-block hljs" ref="hlDiv" v-html="v[1]"></div>
					</div>
				</div>
				
			<div style="display: flex;">
				<el-button size="small" icon="el-icon-refresh" circle @click='handleClearClick'></el-button>

				<el-input size="small" v-model='inputQuestion' @change='()=>{submitHandle(inputQuestion)}'
					placeholder='请输入问题'></el-input>
				<el-button size="small" icon="el-icon-s-promotion" circle
					@click='()=>{submitHandle(inputQuestion)}'></el-button>
			</div>
			</div>
			<script src="${markedFile}"></script>
			<script src="${hightLightFile}"></script>
            <script src="${vueFile}"></script>
			<script src="${elementFile}"></script>			
            <script src="${mainFile}"></script>
        </body>
    </html>
`
};

module.exports = Html;