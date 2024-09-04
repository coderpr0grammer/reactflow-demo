export const initialNodes = [
    {
        id: 'start-node',
        type: 'startNode',
        userReadableType: 'Conversation Start',
        position: { x: 0, y: 0 },
        data: {
            title: "Start Phone Call",
            userReadableType: "Start Conversation",
            instructions: 'Hey there, how are you doing today?'
        },
        // deletable: false

    },
    {
        id: 'end-node',
        type: 'endNode',

        position: { x: -200, y: 300 },
        data: {
            title: "End Phone Call",

            userReadableType: 'Conversation End',
            instructions: "End of conversation"
        },
        //  deletable: false
    }
];

export const initialEdges = [
    // { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true }
];
