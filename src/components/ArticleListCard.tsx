import React from 'react';
import './articleListCard.css'
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import unixToDateTime from '../utils/datetime'
import { Link } from 'react-router-dom';

type Props = {
    article: any,
    onTagClick: (tag: string) => void
}

function ArticleListCard(props: Props) {
    const { scribe_data, scribe_tags } = props.article;
    const { synopsis, title } = {
        synopsis: scribe_data[0].value,
        title: scribe_data[2].value
    }

    const chipValue = () => {
        let str = ''
        scribe_tags.forEach((tag: any, index: number) => {
            str += (index + 1 !== scribe_tags.length ? `${tag.value} • ` : `${tag.value} `).toUpperCase()
        })
        return str
    }
    return (
        <div className="article-list-card card">
            <h2>
                <Link to={`/view/${props.article.id}`}>
                    {title}
                </Link>
            </h2>
            <Link to={`/view/${props.article.id}`}>
                <img src={props.article.image}/>
            </Link>
            {/* <div className="tags-heading">
                {tagline}
            </div> */}
            <p>
                {synopsis}
            </p>
            <div className='list-date'>
                {unixToDateTime(props.article.unixTime)}
            </div>
            {scribe_tags.map((tag: any, index: number) => {
                return  <Chip
                    key={tag.value}
                    label={tag.value.toUpperCase()}
                    className="chip"
                    variant="outlined"
                    onClick={() => { props.onTagClick(tag.value.toLowerCase()) }}
                />
            })}

        </div>

    );
}

export default ArticleListCard