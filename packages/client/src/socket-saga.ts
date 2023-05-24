import { eventChannel as EventChannel } from "redux-saga";
import { call, fork, put, take, takeEvery } from "redux-saga/effects";
import io, { Socket } from "socket.io-client";

//-------------------------------------------------------------------------
let socket: Socket | null;

//-------------------------------------------------------------------------
const connect = (socketProps: any) => {
  const { host, options = {} } = socketProps;
  if (!socketProps?.host) {
    throw new Error("Invalid Socket IO Props!");
  }
  socket = io(host, { ...options });
};

//-------------------------------------------------------------------------
const on = ({ socket, event, action }: any) =>
  EventChannel((dispatch: any) => {
    const fwAction = action || event.toUpperCase();
    socket.on(event, (message: any) => {
      dispatch({ type: fwAction, data: { socket, event, message } });
    });
    return () => {
      socket.off(event);
    };
  });

//-------------------------------------------------------------------------
function* listen(props: any) {
  const channel = yield call(on, props);
  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    console.log(props, " is terminated!");
  }
}

//-------------------------------------------------------------------------
function* onIOConnect() {
  yield takeEvery("CONNECT", function* run() {
    if (!socket) {
      console.log("Failed.... ");
      return;
    }

    const data = {
      isConnected: true,
    };
    yield put({ type: "CONNECTED", data });
    socket?.emit("authenticate");
  });
}

//-------------------------------------------------------------------------
function* onAuthenticated() {
  yield takeEvery("AUTHENTICATED", function* run() {
    socket?.emit("join", {
      rooms: ["market-price"],
    });
  });
}

//-------------------------------------------------------------------------
function* onIORoomRequest() {
  yield takeEvery("MARKET-PRICE", function* run(action: any) {
    const data = action?.data?.message;
    if (!data) {
      return;
    }
    yield put({ type: "MARKET_DATA", data });
  });
}

//-------------------------------------------------------------------------
function* onIODisconnect() {
  yield takeEvery("DISCONNECT", function* run() {
    yield call(() => {
      // disconnect the socket before the page unloads
      return new Promise<void>((resolve) => {
        socket?.on("disconnect", () => {
          resolve();
        });
        socket?.disconnect();
      });
    });
  });
}

//-------------------------------------------------------------------------
function* establish() {
  yield takeEvery("SOCKET_ESTABLISH", function* run() {
    yield call(connect, {
      host: "http://localhost:4999",
      options: {
        path: "/stream",
        forceJSONP: true,
      },
    });

    if (!socket) {
      console.error("Failed to initialize socket!");
      return;
    }
    //Events
    const events = [
      { event: "connect" },
      { event: "disconnect" },
      { event: "authenticated" },
      { event: "unauthenticated" },
      { event: "ping" },
      { event: "market-price" },
    ];
    for (const el of events) {
      yield fork(listen, { socket, ...el });
    }
  });
}

//-------------------------------------------------------------------------
export default function* sagas() {
  yield fork(establish);

  //Events
  yield fork(onIOConnect);
  yield fork(onAuthenticated);
  yield fork(onIODisconnect);
  yield fork(onIORoomRequest);
}
