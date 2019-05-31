import moment from 'moment'


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function colorsIn(r, b) {
    this.r = r
    this.b = b
   
}


colorsIn.prototype.update = function () {

    if(this.r>1500) this.r=0.01
    if(this.b>1500) this.b=0.01
    //if(this.a>500) this.b=0.01
    // if(this.a>500) this.a=0.01
    this.r+=0.01
    // this.a+=0.0001;
    this.b+=0.01
   

    return `hsl(${Math.abs(200 * Math.sin(this.r))}, ${Math.abs(50 *Math.sin(this.b) )}%, ${Math.abs(50 )}%)`

    // return `rgba(${Math.abs(255 * Math.sin(this.r))}, ${Math.abs(255 * Math.sin(this.g))}, ${Math.abs(255 * Math.sin(this.b))}, 
    // ${Math.abs(Math.sin(this.a))})`
}



function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    }
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle)
    var end = polarToCartesian(x, y, radius, startAngle)

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ')

    return d
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    )
}

const generateDate= (date, format='MMM do YYYY') => {
    return moment(date).format(format)
}
export {mapNumber,describeArc, generateDate,getRandomArbitrary,colorsIn }
   
