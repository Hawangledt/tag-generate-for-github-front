import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import api from "../../services/api"
import { ContainerCard, ContainerMain, FormTags, TagsContainer } from "./styles"
import ModalButton from "../../components/modal"
import { useTagsGitHub } from "../../hooks";
import { Close } from "@material-ui/icons"


function Main() {
    const [repos, setRepos] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const { count, setCount } = useTagsGitHub();

    async function createNewTag() {
        try {
            await api.post("/tags/new", { name: newTag, auth_id: 1 })
            setCount(count + 1)
        } catch (error) {
            console.log(error.response.data.detail)
        }
    }
    async function deleteTag(repoID, tagID) {
        try {
            await api.delete(`/tags/${repoID}/${tagID}`, {
                
            })
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
                        <ModalButton tags={tags} repo_id={item.id} />
                        <TagsContainer>
                            {item.tags.map((data) => (
                                <button onClick = {() => deleteTag(item.id, data.id) } key={data.id}>{data.name}  <Close style = {{marginLeft: 8}}/></button>
                            ))}
                        </TagsContainer>
                    </ContainerCard>
                ))}
            </ContainerMain>
        </>
    )
};

export default Main;