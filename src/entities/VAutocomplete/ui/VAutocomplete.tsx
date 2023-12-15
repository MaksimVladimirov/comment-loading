/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Autocomplete, CircularProgress, TextField, Card, CardContent, Button } from "@mui/material";
import { getComments, getLoadingStatus } from "../model/selectors/commentsSelectors";
import { fetchComments } from "../model/services/fetchComments";
import { IComment } from "../model/types/comment";
import { RootState } from "../../../app/store/store";

import './VAutocomlete.css'

export const VAutocomplete = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const [searchText, setSearchText] = useState('');
    const [filteredComments, setFilteredComments] = useState<IComment[]>([]);
    const comments = useSelector(getComments) as IComment[]
    const loading = useSelector(getLoadingStatus)

    const handleSearchChange = (
        _event: SyntheticEvent<Element, Event>,
        value: string,
    ) => {
        setSearchText(value);
        if (value) {
            const filteredComments = comments.filter((comment: IComment) =>
                comment.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredComments(filteredComments);
        } else {
            setFilteredComments(comments);
        }
    };

    const handleOptionSelected = (_event: SyntheticEvent<Element, Event>, value: IComment | null) => {
        if (value) {
            setSearchText(value.name);
        }
    };

    const highlightMatches = (text: string, searchText: string) => {
        if (!searchText) return text;

        const lowerText = text.toLowerCase();
        const lowerSearchText = searchText.toLowerCase();

        const startIndex = lowerText.indexOf(lowerSearchText);
        if (startIndex === -1) return text;

        const matchedPart = text.substr(startIndex, searchText.length);
        const preMatchedPart = text.substr(0, startIndex);
        const postMatchedPart = text.substr(startIndex + searchText.length);

        return (
            <>
                {preMatchedPart}
                <strong>{matchedPart}</strong>
                {postMatchedPart}
            </>
        );
    };

    useEffect(() => {
        setFilteredComments(comments)
    }, [comments])

    return (
        <div className="comments-container">
            <Button onClick={() => dispatch(fetchComments())} variant="outlined">Autocomplete</Button>
            <Autocomplete
                className=""
                options={filteredComments || []}
                getOptionLabel={(option: IComment) => option.name}
                onChange={handleOptionSelected}
                onInputChange={handleSearchChange}
                loading={loading === 'loading'}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Comments"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading === 'loading' ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                isOptionEqualToValue={(option: IComment, value) => option.name === value.name}
                renderOption={(props, option: IComment, state) => (
                    <li {...props}>
                        <Card variant="outlined">
                            <CardContent style={{ backgroundColor: state.index % 2 === 0 ? 'white' : 'lightgray' }}>
                                <p>name: {highlightMatches(option.name, searchText)}</p>
                                <p>email : {option.email}</p>
                                <p>body : {option.body}</p>
                            </CardContent>
                        </Card>
                    </li>
                )}
                style={{ width: 700, marginTop: 20 }}
            />
        </div>
    );
};
