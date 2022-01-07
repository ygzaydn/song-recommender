import React, { useEffect } from "react";

import { CircleMenu, CircleMenuItem } from "react-circular-menu";

import AlbumIcon from "@mui/icons-material/Album";
import TagIcon from "@mui/icons-material/Tag";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

const CircleMenuCustomized = ({ state, changeState }) => {
    useEffect(() => {}, [state, changeState]);
    return (
        <CircleMenu
            startAngle={180}
            rotationAngle={-180}
            itemSize={3}
            radius={9}
            rotationAngleInclusive={true}
            onMenuToggle={() => {
                console.log("asd");
            }}
        >
            <CircleMenuItem
                onClick={() => changeState("Artists")}
                tooltip="Top Artists"
                tooltipPlacement="right"
                menuActive={false}
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
        </CircleMenu>
    );
};

export default CircleMenuCustomized;
