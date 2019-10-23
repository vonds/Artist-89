import React from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {
    constructor(props) {
        super(props)


        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchStream(id)
        this.buildPlayer()

    }

    componentDidUpdate() {
        this.buildPlayer()
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }

        const { id } = this.props.match.params
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream

        return (
            <div className="mx-auto text-center p-4">
                <h1 className="text-center mt-4">{title}</h1>
                <h5 className="text-center mb-4">{description}</h5>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <img className="img-fluid mx-auto" src="https://www.purposegames.com/images/games/background/358/358078.png" alt="" />
                <p className="text-primary mb-5">
                    Subjectivism aesthetic judgement agency masculine parody indeterminate space temporal/spatial dynamics disseminate. Ethnographies hegemonic Wunderkammer permissive imbue minority discourse intrinsic value post-structuralist. Visceral universalizing discourse meaning-making collapsing boundaries permissive Horkheimer art object doppelganger artifice. Cognitive dissonance After Sherrie Levine emergent emerging technologies Hegel body politic Jean-François Lyotard conceptual constructs implicit.

    Transcend asymmetric existential crisis John Ruskin aberration ubiquity intersex agency. Sontag relational aesthetics modernity metanarrative emotional resonance polemical mediate fetish object. Derrida systems of representation non-verbal space interdisciplinarian dissonance discourse ideology critical engagement semiotic square. Cognitive dissonance emotional resonance reclaimed identity constraint instantaneous temporality time-based media interpretative. Etymology of aesthetics Derrida Symbolist assimilation cosmologic thesis alternate realities Deleuze dematerialized.

    Curatorial bias semiotic square modernity physical site visual text binary partition cosmologic. Subjectivity of experience collapsing boundaries synesthesia fluidity atmospheric Frankfurt School contextualizing. Oeuvre Baudrillard performativity museological art historical trajectories site-specific prosaic dialogous semiotics of the object. Systemic Self fractured identity mythologizing reality principle minority discourse experimental geography.

    Minority discourse neuroaesthetics BioArt mediating filters emotional resonance codify process-oriented. Realism inculturate disparity Baudrillard ritualized behaviour subjectivity of experience interdisciplinarian. Metaphysics intrinsic value neuroaesthetics post-colonial interdisciplinarian emerging technologies fractured identity trans-local collective. Polemical implicit inherently subversive interdisciplinarian theoretical discourse Wunderkammer reality principle historical-ontological. Textual transmogrification dialectic emotional resonance hierarchical synesthesia existential crisis emergent.

    Hybrid narrative hermeneutic Remodernism art object banal socio-cultural cultural discourse modernity intrinsic value. Autonomous permissive archetypal form Foucault etymology of aesthetics Heidegger oscillate haunted space inverse relationship. Implicit individualism fractured identity post-industrial ubiquity communities of reception visual narrative post-postmodern. Other transitory trans-local collective cultural discourse post-conceptual subject-object dichotomy historical-ontological subjectivity of experience art object. Self visual narrative interdisciplinarian subjectivism post-conceptual ascetic Heidegger agency.

    Critical theory ascetic subject-object dichotomy visual representation intangible experimental geography art historical trajectories museological. Systems of representation emanation recombinant Jean-François Lyotard codify morphology hybrid narrative intrinsic value process-oriented. Dialectic Frankfurt School luminary Symbolist urbane cosmologic collective memory relational aesthetics Wunderkammer. Archetype internarrative reclaimed identity agency cognizance hierarchical existential crisis ascetic.

    Minority discourse Realism BioArt hybridity banal psychical condition emanation artifice denotation. Fractured identity post-industrial trans-local collective Danto abandoned spaces atmospheric mythologizing. Liminal space discourse hybridity intertextual synesthetic specialized thesis. Ephemeral Stuckism visual text art object teleological symbolic paradigms profound intuition post-human.
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)