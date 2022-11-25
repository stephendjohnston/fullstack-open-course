const Filter = ({ newSearch, onChange }) => {
  return (
    <div>
      filter contacts with <input
      value={newSearch}
      onChange={onChange}
      />
    </div>
  )
}

export default Filter