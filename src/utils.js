const URL_BASE = 'http://localhost:6688/api';
const SSE_URL = 'http://localhost:6687/events';

const getUrlBase = () => {
    return URL_BASE;
}

const initSSE = (store) => {
    let url = `${SSE_URL}?token=${store.state.token}`;
    const sse = new EventSource(url);

    sse.addEventListener('NewMessage', (e) => {
        let data = JSON.parse(e.data);
        console.log('NewMessage:', data);
        delete data.event;
        store.commit('addMessage', { channelId: data.chatId, message: data });
    });

    sse.onmessage = (e) => {
        console.log('got event:', event);    }

    sse.onerror = (e) => {
        console.error('EventSource failed:', error);
        sse.close();
    }

    return sse;
}

export {
    getUrlBase,
    initSSE
};
