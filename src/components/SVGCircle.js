import React, {Component} from 'react'
import {describeArc} from '../helpers/timeHelpers'
import {colorsIn,getRandomArbitrary} from '../helpers/timeHelpers'
export default class SVGCircle extends Component{

    state={
        colorsIn:new colorsIn(getRandomArbitrary(200, 1), getRandomArbitrary(50, 1))
    }
    render() {
        let{raduis} =this.props
        console.log(raduis)
        return (
            <svg className="countdown-svg">
<path
fill="none"
stroke={this.state.colorsIn.update()}
stroke-width="4"
d={describeArc(50, 50, 48, 0, raduis)}
/>
</svg>
        )
    }
}