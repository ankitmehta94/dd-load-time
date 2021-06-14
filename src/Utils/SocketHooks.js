import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
export function useSocketHook({endpoint, messageKey, storageLimit,samplingRate, dataFormatter}) {
    const [response, setResponse] = useState([]);
    const noStorageLimit = storageLimit === null;
    useEffect(() => {
      const socket = socketIOClient(endpoint, {query:{
          samplingRate
      }}); //TODO: Error Handling
      socket.on(messageKey, (data) => {
        response.push(dataFormatter(data));
        if (!noStorageLimit && response.length > storageLimit) {
          response.shift();
        }
        setResponse(response.slice());
      });
    }, []);
    function getResponse(params) {
        return response;
    }
    console.log(JSON.stringify(response))
    return [getResponse, setResponse]
}