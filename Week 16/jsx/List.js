import { Component, STATE, ATTRIBUTE, createElement } from "./framework"

export {STATE, ATTRIBUTE} from './framework';

export class List extends Component {
    constructor() {
        super()
    }
    render() {
        
        this.childeren = this[ATTRIBUTE].data.map(this.template)
        this.root = (<div>{this.childeren}</div>).render()
        return this.root
    }

    appendChild(child) {
        this.template = (child)
        this.render()
    }
}