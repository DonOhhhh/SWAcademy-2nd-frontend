import { request } from './API.js'
import Nodes from './Nodes.js'

export default function App({ $target }) {

    this.state = {
        isRoot: true,
        nodes: []
    }

    const nodes = new Nodes({
        $target,
        initialState: this.state,
        onClick: async (node) => {
            if (node.type === 'DIRECTORY') {
                await fetchNodes(node.id);
            }
        }
    })

    this.setState = nextState => {
        this.state = nextState;
        nodes.setState(nextState)
    }

    const fetchNodes = async (id) => {
        const nodes = await request(id ? `/${id}` : '/')
        this.setState({
            ...this.state,
            nodes,
            isRoot: id ? false : true
        })
    }
    fetchNodes();
}