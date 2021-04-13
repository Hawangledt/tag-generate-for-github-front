import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import api from "../../services/api"
import { ContainerCard, ContainerMain, FormTags, TagsContainer, TitleID, TitleName, TitleDescription } from "./styles"
import ModalButton from "../../components/modal"
import { useTagsGitHub } from "../../hooks";
import { Close } from "@material-ui/icons"
import { toast } from "react-toastify";


function Main() {
    const [repos, setRepos] = useState([]);
    const [filteredReposList, setFilteredReposList] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [searchTag, setSearchTag] = useState("");

    const { count, setCount } = useTagsGitHub();
    const typeRepo = filteredReposList.length === 0 ? repos : filteredReposList;


    async function createNewTag() {
        try {
            await api.post("/tags/new", { name: newTag, auth_id: 1 })
            setCount(count + 1)
        } catch (error) {
            toast.error('🦄' + error.response.data.detail, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }
    async function deleteTag(repoID, tagID) {
        try {
            await api.delete(`/tags/${repoID}/${tagID}`, {

            })
            setCount(count + 1)
        } catch (error) {
            toast.error('🦄 ' + error.response.data.detail, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
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

    useEffect(() => {
        function filteredRepos() {
            const filteredReposListTemp = [];
            filteredReposListTemp.splice(0, filteredReposListTemp.length)
            for (let index = 0; index < repos.length; index++) {
                const tags = repos[index].tags;
                for (let i = 0; i < tags.length; i++) {
                    const element = tags[i];
                    if (element.name.indexOf(searchTag) !== -1 && searchTag !== "") {
                        filteredReposListTemp.push(repos[index])
                        console.log(searchTag)
                        break
                    }
                }
            }
            if (filteredReposListTemp.length === 0) {
                setFilteredReposList(repos)
            }
            else {
                setFilteredReposList(filteredReposListTemp)
            }
    
        }
        filteredRepos()
    }, [repos, searchTag])

    return (
        <>
            <FormTags>
                <h1>
                    Create tags
                </h1>
                <TextField onChange={(e) => setNewTag(e.target.value)} label="Create a tag" variant="outlined" />
                <button onClick={() => createNewTag()}>create</button>
            </FormTags>
            <Autocomplete 
                style= {{margin: 40}}
                id="tags"
                options={tags}
                getOptionLabel={(option) => option.name}
                onInputChange={(e, value) => setSearchTag(value)}

                renderInput={(params) => (
                    <TextField {...params} label="Search a tag" variant="outlined" />

                )}
            />
            <ContainerMain>
                {typeRepo.map((item) => (
                    <ContainerCard key={item.github_repo_id}>
                        <TitleID>{item.github_repo_id}</TitleID>
                        <TitleName to={{ pathname: item.html_url }} target="_blank">
                            {item.name}
                        </TitleName>
                        <TitleDescription>{item.description === null ? "Don't have a description" : item.description}</TitleDescription>
                        <ModalButton tags={tags} repo_id={item.id} />
                        <TagsContainer>
                            {item.tags.map((data) => (
                                <button onClick={() => deleteTag(item.id, data.id)} key={data.id}>{data.name}  <Close style={{ marginLeft: 8 }} /></button>
                            ))}
                        </TagsContainer>
                    </ContainerCard>
                ))}
            </ContainerMain>
        </>
    )
};

export default Main;
