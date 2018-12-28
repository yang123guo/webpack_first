import './index.less';

const div = document.createElement('div');
div.setAttribute('class', 'demo');
div.innerHTML = '<p>这是一段文字</p>';
document.body.appendChild(div);

export default div;