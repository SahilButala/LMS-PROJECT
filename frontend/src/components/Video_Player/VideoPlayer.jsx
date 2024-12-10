import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
("");


const VideoPlayer = ({ width = "100%", height = "100%", url , onProgressUpdate, progressData }) => {
  // video player controls
  const [playing, setplaying] = useState(false);
  const [volume, setvolume] = useState(0);
  const [muted, setmuted] = useState(false);
  // how  much video are play ex-30min video user play only 15sec video
  const [playedIt, setplayedIt] = useState(0);
  const [seeking, setseeking] = useState(false);
  const [isFullscreen, setisFullscreen] = useState(false);
  const [showControls, setshowControls] = useState(true);

  // refrence
  const playerRef = useRef(null);
  const ContainerRef = useRef(null);
  const controlsTimeOutRef = useRef(null);

  // functions
  function handlePlayAndPause() {
    setplaying(!playing);
  }

  function handleVolumeChange(newValue) {
    setvolume(newValue[0]);
  }

  function handleProgress(state) {
    if (!seeking) {
      setplayedIt(state.played);
    }
  }

  function handleRewind() {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime() - 5);
  }

  function handleForWard() {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime() + 5);
  }

  function handleToggleMute() {
    setmuted(!muted);
  }

  function handleSeekChange(newValue) {
    setplayedIt(newValue[0]);
    setseeking(true);
  }

  function handleMouseSeekUp() {
    setseeking(false);
    playerRef?.current?.seekTo(playedIt);
  }

  // full screen handler
  const handlefullScreen = useCallback(() => {
    if (!isFullscreen) {
      if (ContainerRef?.current?.requestFullscreen) {
        ContainerRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setisFullscreen(document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  });


  useEffect(()=>{
         if(playedIt === 1){
          onProgressUpdate({
            ...progressData,
            progressValue : playedIt
          })
         }
  },[playedIt])



  function FormatTime(seconds) {
    const date = new Date(seconds * 1000);
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = pad(date.getUTCSeconds());

    if (hour) {
      return `${hour}:${pad(minute)}:${pad(second)}`;
    }
    return `${minute}:${second}`;
  }

  function pad(string) {
    return ("0" + string).slice(-2);
  }

  function handleMove() {
    setshowControls(true);
    clearTimeout(controlsTimeOutRef?.current);

    controlsTimeOutRef.current = setTimeout(() => {
      setshowControls(false);
    }, 5000);
  }

  

  return (
    <div
      ref={ContainerRef}
      className={`relative border border-red-500
       rounded-md overflow-hidden shadow-2xl transition-all  duration-300 ease-in-out 
    ${isFullscreen ? "w-full h-full" : null}     
    `}
      style={{ width, height }}
      onMouseMove={handleMove}
      onMouseLeave={() => setshowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        className={`absolute top-0 left-0`}
        height={"100%"}
        width={"100%"}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
      />
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-slate-500 bg-opacity-75 p-3 transition-opacity duration-300  ${
            showControls ? "opacity-100" : "opacity-0"
          } `}
        >
          <Slider
            value={[playedIt * 100]}
            max={100}
            step={0.1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleMouseSeekUp}
            className={`w-full mb-4`}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center  space-x-4">
              {/* play pause btn */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayAndPause}
                className={`text-white hover:text-primary p-2 `}
              >
                {playing ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
              {/* rewind btn */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRewind}
                className="p-2"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
              {/* forward btn */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleForWard}
                className="p-2"
              >
                <RotateCw className="h-3 w-3" />
              </Button>
              {/* mute toggle btn */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleMute}
                className=""
              >
                {muted ? (
                  <VolumeX className="h-3 w-3" />
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                className="w-full"
              />
              <div className="flex  flex-row items-center space-x-2 ">
                <div className="text-white flex gap-1">
                  <p>
                    {FormatTime(
                      playedIt * (playerRef?.current?.getDuration() || 0)
                    )}
                  </p>
                  / <p>{FormatTime(playerRef?.current?.getDuration() || 0)}</p>
                </div>
              </div>
              <div className="absolute right-4 ">
                <Button variant="ghost" size="icon" onClick={handlefullScreen}>
                  {isFullscreen ? (
                    <Minimize className="h-3 w-3" />
                  ) : (
                    <Maximize className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;