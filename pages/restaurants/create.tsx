import { Input } from '@tastiest-io/tastiest-ui';
import React from 'react';

function CreateRestaurant() {
  return (
    <div>
      <p className="pb-4 text-xl font-primary">Add A Restaurant</p>

      <div className="flex flex-col w-full space-y-4">
        <Input label="Restaurant Name" />
        <Input label="Website" />
        <Input label="Instagram" />
        <Input label="Facebook" />
        <Input label="Restaurant Name" />
      </div>
    </div>
  );
}

export default CreateRestaurant;
