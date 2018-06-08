const React = require('react');
const assert = require('power-assert')
import {shallow} from 'enzyme';
var Home = require("../clients/admin/system/home")

function shallowRender(Component) {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Component/>);
    return renderer.getRenderOutput();
}

describe('mall-api-test', () => {
    it('addTocart', (done) => {
        let app = shallow(<Home/>);
    })
})