const IMG = '/logo192.png';

const categories = [
    { id: 1, name: 'Minecraft', image: IMG },
    { id: 2, name: 'Zelda', image: IMG },
    { id: 3, name: 'Mario Kart', image: IMG },
];

const channels = [
    { id: 1, name: 'steve', image: IMG, preview: IMG, content: 'LembwKDo1Dk', channelTypeId: 1, categoryId: 1 },
    { id: 2, name: 'alex', image: IMG, preview: IMG, content: 'chair', channelTypeId: 2, categoryId: 1 },
    { id: 3, name: 'link', image: IMG, preview: IMG, content: 'abc123', channelTypeId: 1, categoryId: 2 },
];

const comments = {
    steve: [
        { created_at: '2024-01-01T10:00:00Z', author: 'alex', text: 'first!' },
        { created_at: '2024-01-01T10:01:00Z', author: 'link', text: 'nice build' },
    ],
    alex: [],
    link: [],
};

module.exports = { categories, channels, comments };
