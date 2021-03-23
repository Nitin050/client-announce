import React from "react";


const TagsInput = props => {
    const [tags, setTags] = React.useState([]);
    const [error, setError] = React.useState('');
    const addTags = event => {
      event.preventDefault();
      if (event.key === "Enter" && event.target.value !== "") {
        if (event.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
          {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            setError('');
            event.target.value = "";
          }
        else
          {
            setError('Invaild email format');
          }

        // alert("You have entered an invalid email address!")
        // return (false)
      }
    };

    const removeTags = index => {
      setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    return (
        <div className="tags-input">
            <div className="flex flex-col">
              <form>
              <label className="leading-loose">Invite members</label>
              <div className="relative focus-within:text-gray-600 text-gray-400">
                <input 
                  type="text" 
                  pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                  className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full  border-gray-300 rounded-md focus:outline-none text-gray-600" 
                  onKeyUp={event => addTags(event)}
                  placeholder="type email & press enter"
                />
                <div className="absolute left-3 top-2">
                  <i className="fa fa-user-plus"></i>
                </div>
              </div>
              </form>
              <span className="text-red-600">{error}</span>
            </div>
         
          <ul>
            {tags.map((tag, index) => (
                <li key={index} className="py-0.5 px-2 w-max bg-gray-200 inline-block m-1">
                    <span className="">{tag}</span>
                    <i
                        className="fa fa-close ml-2"
                        onClick={() => removeTags(index)} 
                    >
                    </i>
                </li>
            ))}
          </ul>

        </div>
    );
};
export default TagsInput;