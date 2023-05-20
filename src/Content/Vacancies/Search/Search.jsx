import s from "./Search.module.css"
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { userAPI } from "../../../API";
import { useState } from "react";

function Search(props) {
    const theme = useMantineTheme();

    let [text, setText] = useState("")

    function onChange(event){
        setText(event.target.value)
    }

    return (
        <div>
            <TextInput
                onChange={onChange}
                value={text}
                icon={<IconSearch size="1.1rem" stroke={1.5} />}
                radius="xl"
                size="md"
                rightSection={
                    <ActionIcon onClick={() => props.onSearchClick(text)} size={32} radius="xl" color={theme.primaryColor} variant="filled">
                        {theme.dir === 'ltr' ? (
                            <IconArrowRight size="1.1rem" stroke={1.5} />
                        ) : (
                            <IconArrowLeft size="1.1rem" stroke={1.5} />
                        )}
                    </ActionIcon>
                }
                placeholder="Искать вакансию"
                rightSectionWidth={42}
                {...props}
            />
        </div>
    );
}

export default Search;
