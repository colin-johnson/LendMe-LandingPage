//based on http://codepen.io/pixelass/pen/PqMpYL
function createAnim({target}) {
    var input = target.find({name: 'input'})
    var crossTB = target.find({name: 'crossTB'})
    var crossBT = target.find({name: 'crossBT'})

    return new TimelineMax()
        .set(input, {width: 300, height: 52})
        .set(crossBT, {rotation: 45,})
        .pause()
        .add('open')
        .to(input, 0.18, {width: 52})
        .add('morph', '-=0.074')
        .to(crossBT, 0.12, {rotation: 0, opacity: 0}, 'morph-=0.08')
        .to(input, 0.23, {scale: 0.5, x: -4, y: -4, borderWidth: 6, borderRadius: 26, paddingLeft: 0, ease: Back.easeOut,}, 'morph')
        .to(crossTB, 0.12, {borderWidth: 4, scale: 0.73, x: 1, y: -2, ease: Back.easeOut,}, 'morph')
        .add('collapse')
}

const styles = {
    root: {
        position: 'relative',
        width: 300,
        height: 52
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#121212'
    },
    input: {
        outline: 'none',
        position: 'absolute',
        right: 0,
        color: GS_GREEN,
        borderColor: GS_GREEN,
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: 'transparent',
        cursor: 'text',
        paddingLeft: '16.5px',
        boxSizing: 'border-box',
        fontSize: '16px',
    },
    cross: {
        pointerEvents: 'none',
        position: 'absolute',
        right: 15,
        top: 26,
        width: 0,
        height: 26,
        transform: 'rotate(-45deg) translateY(-18px)',
        borderLeftColor: GS_GREEN,
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
    },
    close: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 52,
        height: 52,
        backgroundColor: 'transparent',
        cursor: 'pointer',
    }
}

class Demo extends React.Component {
    componentDidMount() {
        this.anim = this.addAnimation(createAnim)
            .seek('collapse')
    }

    handleOpenClick = () => {
        this.inputNode.focus()
    }

    handleSideClick = (e) => {
        e.preventDefault()
        if (document.activeElement === this.inputNode) {
            this.inputNode.blur()
        }
        else {
            this.inputNode.focus()
        }
    }

    render () {
        return <Center>
            <div style={styles.root}>
                <div style={styles.background} onClick={this.handleOpenClick}/>
                <input
                    type = 'text'
                    ref = {component => this.inputNode = ReactDOM.findDOMNode(component)}
                    onFocus = {() => this.anim.tweenTo('open')}
                    onBlur = {() => this.anim.tweenTo('collapse')}
                    name = 'input'
                    style = {styles.input}/>
                <div name='crossTB' style={styles.cross}/>
                <div name='crossBT' style={styles.cross}/>
                <div name='close' style={styles.close} onMouseDown={this.handleSideClick}/>
            </div>
        </Center>
    }
}

const GSAPDemo = GSAP()(Demo)
ReactDOM.render(<GSAPDemo/>, mountNode)


//update the transform style on every mousemove event
//while it's also animating(y, scale, rotate)

function createAnim({target}) {
    var box = target.find({name: 'box'})

    return new TimelineMax({repeat: -1})
        .to(box, 1, {scale: 1.23, y: '+=120'})
        .to(box, 1, {scale: 1, y: '-=120'})
        .to(box, 1, {rotation: 90}, 1)
}

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {x: 0, y: 0}
    }

    componentDidMount() {
        var rootNode = document.querySelector('.playgroundPreview')
        var {top, left} = rootNode.getBoundingClientRect()
        rootNode.addEventListener('mousemove', e => this.setState({
            x: e.clientX - 60 - left,
            y: e.clientY - 60 - top
        }))

        this.jumpAnim = this.addAnimation(createAnim)
    }

    handleClick = () => {
        this.jumpAnim.paused(!this.jumpAnim.paused())
    }

    render () {
        var {x, y} = this.state

        var style = {
            backgroundColor: GS_GREEN,
            width: 123,
            height: 123,
            transform: `translate(${x}px, ${y}px)`
        }

        var containerStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
        }

        return (
            <div onClick={this.handleClick} style={containerStyle}>
                <Text>Click to pause!</Text>
                <div name='box' style={style}/>
            </div>
        )
    }
}

const GSAPDemo = GSAP()(Demo)
ReactDOM.render(<GSAPDemo/>, mountNode)



function emitAnim({target, options}) {
    var emitter = target.find({name: 'emitter'})
    var point = target.find({name: options.name})

    return new TimelineMax()
        .set(point, {
            backgroundColor: 'transparent',
            scale: 0,
        })
        .to(emitter, 1.2, {
            backgroundColor: '#DDDDDD',
            scale: 0.68,
            ease: Circ.easeOut,
        })
        .add('release')
        .to([emitter, point], 0.2, {
            backgroundColor: options.color,
            scale: 1,
            ease: Back.easeOut
        })
        .to(point, 0.45, {
            left: options.x,
            top: options.y,
            ease: Sine.easeOut,
        }, 'release')
}

var COLORS = ['#0074D9', '#FF851B', '#FF4136', '#85144b', '#2ECC40']

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {points: []}
    }

    handleEmit = (e) => {
        var {top, left} = this.middleContainerNode.getBoundingClientRect()
        var name = `point${this.state.points.length}`
        var newPoint = {
            name,
            color: _.sample(COLORS),
            x: e.clientX - left - 40,
            y: e.clientY - top - 40,
        }
        this.setState({points: [...this.state.points, newPoint]})
        this.addAnimation(emitAnim, newPoint)
    }

    handleMiddleContainerRef = (component) => {
        this.middleContainerNode = ReactDOM.findDOMNode(component)
    }

    render () {
        var containerStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
        }
        var middleContainerStyle = {
            position: 'relative',
            width: 80,
            height: 80,
        }
        var pointStyle = {
            position: 'absolute',
            backgroundColor: GS_GREEN,
            width: 80,
            height: 80,
            top: 0,
            left: 0,
            borderRadius: 40,
        }

        return <div onClick={this.handleEmit} style={containerStyle}>
            <Text>Click somewhere!</Text>
            <Center>
                <div style={middleContainerStyle} ref={this.handleMiddleContainerRef}>
                    <div name='emitter' style={pointStyle}/>
                    {this.state.points.map(point => {
                        return <div
                            name = {point.name}
                            style = {{...pointStyle, backgroundColor: point.color}}/>
                    })}
                </div>
            </Center>
        </div>
    }
}

const GSAPDemo = GSAP()(Demo)
ReactDOM.render(<GSAPDemo/>, mountNode)