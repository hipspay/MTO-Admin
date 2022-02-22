import React, { useState, useEffect } from 'react';
import { IconButton, Button, TextField } from '@material-ui/core';
import { AccountCircle, Edit } from '@material-ui/icons';
import Dropzone from 'react-dropzone';

import Layout from '../../components/Layout';
import './style.scss';
import Spinner from '../../components/Common/Spinner';

const ProfilePage = () => {
    const data = {
        name: 'Luka Modric',
        address: '123 street, New York city, US',
        webSiteLink: 'https://merchant.com/luka-modric',
    };

    const [isEditingMode, setIsEditingMode] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [address, setAddress] = useState('');
    const [webSiteUrl, setWebSiteUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const changeAvatar = (value) => {
        setAvatar(value[0]);
    };

    useEffect(() => {
        if (isEditingMode) {
            setName(data.name);
            setAddress(data.address);
            setWebSiteUrl(data.webSiteLink);
        }
    }, [data.address, data.name, data.webSiteLink, isEditingMode]);

    return (
        <Layout title="Profile">
            <div className="profile-page">
                <div className="user-avatar">
                    <div className="photo">
                        {isEditingMode ? (
                            <Dropzone
                                name="file"
                                className="drop-zone"
                                multiple={false}
                                accept="image/*"
                                onDrop={changeAvatar}
                            >
                                {avatar ? (
                                    <img src={avatar.preview} alt="" />
                                ) : (
                                    <Button className="choose-btn">
                                        Choose Image
                                    </Button>
                                )}
                            </Dropzone>
                        ) : (
                            <AccountCircle />
                        )}
                    </div>

                    {isEditingMode ? (
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        <div className="name">
                            <span>{data.name}</span>
                        </div>
                    )}
                </div>

                <div className="form-field">
                    <label>Address:</label>
                    {isEditingMode ? (
                        <TextField
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    ) : (
                        <span>{data.address}</span>
                    )}
                </div>

                <div className="form-field">
                    <label>Web Site Link:</label>
                    {isEditingMode ? (
                        <TextField
                            variant="outlined"
                            value={webSiteUrl}
                            onChange={(e) => setWebSiteUrl(e.target.value)}
                        />
                    ) : (
                        <span>{data.webSiteLink}</span>
                    )}
                </div>

                {!isEditingMode ? (
                    <IconButton
                        onClick={() => setIsEditingMode(true)}
                        className="edit-btn"
                    >
                        <Edit />
                    </IconButton>
                ) : (
                    <div className="actions">
                        <Button
                            color="default"
                            variant="contained"
                            onClick={() => setIsEditingMode(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setIsLoading(true)}
                        >
                            Update
                        </Button>
                    </div>
                )}

                {isLoading && (
                    <div className="overlay">
                        <Spinner />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProfilePage;
