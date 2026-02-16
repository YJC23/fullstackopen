const Person = ({name, number, onDelete}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <p>{name} {number}</p>
      <button onClick={onDelete}> delete </button>
    </div>
  )
}

const Persons = ({ persons, deletePerson }) => {

  return (
    <div>
      {persons.map(person => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onDelete={() => deletePerson(person.id)}
        />
      ))}
    </div>
  )
}

export default Persons
