import React, { useState } from "react"
import { Modal } from "@material-ui/core"
import { ContainerModal } from "./styles"
import api from "../../services/api"
import { useTagsGitHub } from "../../hooks"

function ModalButton({ tags, repo_id }) {
    const [visible, setVisible] = useState(false);
    const [tagID, setTagID] = useState(0);
    const {count, setCount} = useTagsGitHub();
    async function linkTagToRepository() {
        try {
            await api.post("/tags/add", {
                repo_id, tag_id: tagID
            })
            setCount(count + 1)
            setTagID(0)
            setVisible(false)
            
        } catch (error) {
            console.log(error.response.data.detail)
        }
    }
    
    return (
        <div>
            <button onClick={() => setVisible(!visible)}>
                Add a Tag
            </button>
            <Modal open={visible}>
                <ContainerModal>
                    <select value={tagID} onChange={(e) => setTagID(e.target.value)}>
                        <option value={0} disabled>
                            Choose a tag
                        </option>
                        {tags.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => linkTagToRepository()}>
                        Confirm
                    </button>
                </ContainerModal>
            </Modal>
        </div>
    )
}

export default ModalButton;