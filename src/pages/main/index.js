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
    const [filteredReposList, setFilteredReposList] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [searchTag, setSearchTag] = useState("");

    const { count, setCount } = useTagsGitHub();

    const tagsInRepos = repos.map((item) => item.tags)
    
    // const test = repos.filter((info, index) => info.tags.filter((item) => item.id > 2 ))
    function filteredRepos() {
        const filteredReposListTemp = [];
        filteredReposListTemp.splice(0, filteredReposListTemp.length)
        for (let index = 0; index < repos.length; index++) {
            const tags = repos[index].tags;
            for (let i = 0; i < tags.length; i++) {
                const element = tags[i];
                if (element.name.indexOf(searchTag) !== -1) {
                    filteredReposListTemp.push(repos[index])
                    break
                }              
            }
        }
        setFilteredReposList(filteredReposListTemp)
    }

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

    useEffect(() =>{
        filteredRepos()
    }, [repos, searchTag])

    //filteredRepos()
    // console.log(filteredReposList)

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
                onInputChange = {(e, value) => setSearchTag(value)}
                renderInput={(params) => (
                    <TextField {...params} label="Search a tag" variant="outlined" />

                )}
            />
            <ContainerMain>
                {filteredReposList.map((item) => (
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
