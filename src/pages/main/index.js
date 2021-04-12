import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import api from "../../services/api"
import { ContainerCard, ContainerMain, FormTags, TagsContainer } from "./styles"


function Main() {
    const [repos, setRepos] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [count, setCount] = useState(0);
    async function createNewTag() {
        try {
            await api.post("/tags/new", { name: newTag, auth_id: 1 })
            setCount(count + 1)
        } catch (error) {
            console.log(error.response.data.detail)
        }
    }
    useEffect(() => {
        async function load() {
            const responseRepos = await api.get("/repos/");
            const responseTags = await api.get("/tags/all/");
            setRepos(responseRepos.data);
            setTags(responseTags.data);
        }
        load()
    }, [count])

    console.log(newTag)

    return (
        <>
            <FormTags>
                <h1>
                    Create tags
                </h1>
                <TextField onChange={(e) => setNewTag(e.target.value)} label="Search a tag" variant="outlined" />
                <button onClick={() => createNewTag()}>create</button>
            </FormTags>
            <Autocomplete
                id="tags"
                options={tags}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField {...params} label="Search a tag" variant="outlined" />
                )}
            />
            <ContainerMain>
                {repos.map((item) => (
                    <ContainerCard key={item.github_repo_id}>
                        {item.github_repo_id}
                        {item.name}
                        {item.description === null ? "Não tem descrição" : item.description}
                        {item.html_url}
                        <TagsContainer>
                            {tags.map((data)=> (
                                <button key={data.id}>{data.name}</button>
                            ))}
                        </TagsContainer>
                    </ContainerCard>
                ))}
            </ContainerMain>
        </>
    )
};

export default Main;