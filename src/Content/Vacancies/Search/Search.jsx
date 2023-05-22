import s from "./Search.module.css"
import { TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from "react";

function Search(props) {

    // local state
    let [text, setText] = useState("")

    // functions
    function onChange(event) {
        setText(event.target.value)
    }

    return (
        <div className={s.container}>
            <TextInput
                data-elem="search-input"
                className={s.searchInput}
                onChange={onChange}
                value={text}
                icon={<IconSearch size="1.1rem" stroke={1.5} />}
                size="md"
                rightSection={
                    <Button className={s.searchBtn} data-elem="search-button" onClick={() => props.onSearchClick(text)}>
                       Поиск
                    </Button>
                }
                placeholder="Искать вакансию"
                rightSectionWidth={42}
                {...props}
            />
        </div>
    );
}

export default Search;
