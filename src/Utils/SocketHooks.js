import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

export function useSocketHook(ENDPOINT, MESSAGE_KEY,STORAGE_LIMIT, SAMPLING_RATE,dataFormatter) {
    const [response, setResponse] = useState([]);
    const NO_STORAGE_LIMIT = STORAGE_LIMIT === null;
    useEffect(() => {
      const socket = socketIOClient(ENDPOINT, {query:{
          samplingRate: SAMPLING_RATE
      }});
      socket.on(MESSAGE_KEY, (data) => {
        response.push(dataFormatter(data));
        if (!NO_STORAGE_LIMIT && response.length > STORAGE_LIMIT) {
          response.shift();
        }
        console.log(dataFormatter,'<-----------------dataFormatter -sweet')
        setResponse(response.slice());
      });
    }, []);
    function getResponse(params) {
        return response;
    }
    return [getResponse, setResponse]
}