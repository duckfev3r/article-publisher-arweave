import React from 'react';
import './article-list-card.css'
import { prefix } from '../services/ApiService';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

type Props = {
    article: any
}

function ArticleListCard(props: Props) {
    const { scribe_data, scribe_tags } = props.article;

    const chipValue = () => {
        let str = ''
        scribe_tags.forEach((tag: any, index: number) => {
            str += (index + 1 !== scribe_tags.length ? `${tag.value} • ` : `${tag.value} `).toUpperCase()
        })
        console.log(str)
        return str
    }
    return (
        <div className="article-list-card card">
            <h2>
                <Link to={`view/123`}>
                    {scribe_data[`${prefix}-title`]}
                </Link>
            </h2>
            <div className="tags-heading">
                <i>TAGS</i>
            </div>
            {scribe_tags.map((tag: any, index: number) => {
                return <Chip
                            key={tag.value}
                            onClick={() => console.log('clicked')}
                            label={tag.value.toUpperCase()}
                            className="chip"
                            variant="outlined"
                        />
            })}
            <p>
                {scribe_data[`${prefix}-synopsis`]}
            </p>
            <div>
                <Divider />
            </div>
        </div>

    );
}

export default ArticleListCard