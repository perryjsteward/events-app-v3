import React from 'react';
import './Map.scss';
import Input from  '../../shared/Input/Input';

const Map = () => {
    return (
        <div className="create-form__map bg-grey-100">
            <div className="map__input-field">
                <Input 
                    icon="fa-search"
                    size="medium"
                    type="text"
                    placeholder="Search street address" />
            </div>
        </div>
    );
};

export default Map;