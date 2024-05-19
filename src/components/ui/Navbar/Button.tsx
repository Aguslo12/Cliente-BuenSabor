export const Button = () => {
  return (
    <div className="dropdown dropdown-bottom ">
      <summary tabIndex={0} role="button" className="menu menu-horizontal btn m-1 bg-orange-600 border-orange-600">
      Productos
      </summary>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};
