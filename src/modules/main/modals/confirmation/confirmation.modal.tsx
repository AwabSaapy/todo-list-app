import React, {FC, useState, useEffect} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "../../components/button/button.component";
import "./confirmation.modal.scss";

export interface IConfirmationModalEvent {
    action: "CONFIRM" | "CANCEL",
    payload: {
        data: any,
    }
}

type IShow = (show: boolean, showOptions?: {
    data?: any,
    title?: string;
    description?: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
}) => void;

export const ConfirmationModalApi: { show: IShow } = {
    show: () => {}
}

type ConfirmationModalProps = {
    onChange: (event: IConfirmationModalEvent) => void
}

const ConfirmationModal: FC<ConfirmationModalProps> = (props) => {

    const {
        onChange = (event: IConfirmationModalEvent) => {},
        ...rest
    }  = props;

    const [modalShow, modalShowSet] = useState<boolean>(false);
    const [data, dataSet] = useState<any>();
    const [title, titleSet] = useState<string>("Confirmation");
    const [description, descriptionSet] = useState<string>("");
    const [confirmButtonLabel, confirmButtonLabelSet] = useState<string>("Confirm");
    const [cancelButtonLabel, cancelButtonLabelSet] = useState<string>("Cancel");

    const show: IShow = (show = true, showOptions) => {
        modalShowSet(show);

        if (showOptions?.data) {
            dataSet(showOptions?.data);
        }
        if (showOptions?.title) {
            titleSet(showOptions?.title);
        }
        if (showOptions?.description) {
            descriptionSet(showOptions?.description);
        }
        if (showOptions?.confirmButtonLabel) {
            confirmButtonLabelSet(showOptions?.confirmButtonLabel);
        }
        if (showOptions?.cancelButtonLabel) {
            cancelButtonLabelSet(showOptions?.cancelButtonLabel);
        }
    }

    const onConfirmClick = () => {
        onChange({
            action: "CONFIRM",
            payload: {
                data: data,
            }
        })
    }

    const onCancelClick = () => {
        onChange({
            action: "CANCEL",
            payload: {
                data: data,
            }
        })
    }

    useEffect(() => {
        ConfirmationModalApi.show = show;
    }, []);

    return (
        <Dialog
            className={'confirmation-modal'}
            open={modalShow}
            onClose={() => modalShowSet(false)}
            fullWidth={true}
            {...rest}
        >
            <DialogTitle> {title} </DialogTitle>

            <DialogContent>
                <div> {description} </div>

                <div className="space-xl" />

                <div className="actions-wrapper">
                    <div className="cancel-wrapper">
                        <Button
                            label={cancelButtonLabel}
                            startIcon={<ClearIcon/>}
                            onClick={onCancelClick}
                        />
                    </div>

                    <Button
                        label={confirmButtonLabel}
                        background={'green'}
                        onClick={onConfirmClick}
                        startIcon={<CheckIcon/>}
                    />
                </div>

                <div className="space-xl" />
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmationModal;
