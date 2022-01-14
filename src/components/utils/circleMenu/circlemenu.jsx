import React, { useEffect } from "react";

import { CircleMenu, CircleMenuItem } from "react-circular-menu";

import AlbumIcon from "@mui/icons-material/Album";
import TagIcon from "@mui/icons-material/Tag";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import HomeIcon from "@mui/icons-material/Home";

const CircleMenuCustomized = ({ state, changeState }) => {
    useEffect(() => {}, [state, changeState]);
    return (
        <CircleMenu
            startAngle={180}
            rotationAngle={-180}
            itemSize={4}
            radius={10}
            rotationAngleInclusive={true}
            menuActive={false}
        >
            <CircleMenuItem
                onClick={() => changeState("Artists")}
                tooltip="Top Artists"
                tooltipPlacement="right"
            >
                <AlbumIcon />
            </CircleMenuItem>
            <CircleMenuItem
                onClick={() => changeState("Tags")}
                tooltip="Top Tags"
            >
                <TagIcon />
            </CircleMenuItem>
            <CircleMenuItem
                onClick={() => changeState("Tracks")}
                tooltip="Top Tracks"
            >
                <TrackChangesIcon />
            </CircleMenuItem>
            <CircleMenuItem
                onClick={() => {
                    window.location.pathname = "/";
                }}
                tooltip="Home"
            >
                <HomeIcon />
            </CircleMenuItem>
        </CircleMenu>
    );
};

export default CircleMenuCustomized;
