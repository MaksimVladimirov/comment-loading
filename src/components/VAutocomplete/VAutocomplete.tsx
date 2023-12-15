/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, CircularProgress, TextField, Card, CardContent } from "@mui/material";
import { RootState } from "@reduxjs/toolkit/query";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchComments } from "../../store/fetchComments";

export const VAutocomplete = () => {
    // @ts-ignore
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const [searchText, setSearchText] = useState("");
    const [filteredComments, setFilteredComments] = useState([]);
    // @ts-ignore
    const comments = useSelector((state: RootState) => state.commentSlice.comments);
    // @ts-ignore
    const loading = useSelector((state: RootState) => state.commentSlice.loading);

    useEffect(() => {
        setFilteredComments(comments);
    }, [comments]);
// @ts-ignore
    const handleSearchChange = (event, value) => {
        setSearchText(value);
        if (value) {
            // @ts-ignore
            const filtered = comments.filter(comment =>
                comment.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredComments(filtered);
        } else {
            setFilteredComments(comments);
        }
    };
// @ts-ignore
    const handleOptionSelected = (event, value) => {
        if (value) {
            setSearchText(value.name);
        }
    };
// @ts-ignore
    const highlightMatches = (text, searchText) => {
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

    return (
        <>
            <button className='' onClick={() => dispatch(fetchComments())} type="button">autoComplete</button >

            <Autocomplete
                className=""
                options={filteredComments || []}
                // @ts-ignore
                getOptionLabel={(option) => option.name}
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
                )}// @ts-ignore
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderOption={(props, option, state) => (
                    <li {...props}>
                        <Card variant="outlined">
                            
                            <CardContent style={{ backgroundColor: state.index % 2 === 0 ? 'white' : 'lightgray' }}>
                                {/* @ts-ignore */}
                                {/* @ts-ignore */}
                                <p>name: {highlightMatches(option.name, searchText)}</p>
                                {/* @ts-ignore */}
                                
                                <p>email : {highlightMatches(option.email, searchText)}</p>
                                {/* @ts-ignore */}
                                
                                <p>body : {highlightMatches(option.body, searchText)}</p>
                            </CardContent>
                        </Card>
                    </li>
                )}
                style={{ width: 700 }}
            />
        </>
    );
};
