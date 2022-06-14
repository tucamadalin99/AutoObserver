import './PaperList.scss';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import PaperListItem from './PaperListItem/PaperListItem';

export default function PaperList(props) {

    useEffect(() => {
        const data = props.listData;
        console.log(data);
    }, [props.listData]);

    return (
        <List className="paper-list">
            {props.listData.map(paper => <PaperListItem
                key={paper.id}
                type={paper.type}
                startDate={paper.startDate}
                endDate={paper.endDate}
                license={paper.number} />)}
        </List>
    );
}