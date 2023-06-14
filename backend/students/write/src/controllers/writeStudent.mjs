import Student from '../models/Student.mjs';

const addStudent = async (req, res) => {
  try {
    const { firstName, surname, address, phoneNumber, guardianName, age } = req.body;

    // Create a new student instance
    const student = new Student({
      firstName,
      surname,
      address,
      phoneNumber,
      guardianName,
      age,
    });

    // Save the student to the database
    await student.save();

    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add student', error });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the student from the database
    await Student.findByIdAndDelete(id);

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student', error });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, surname, address, phoneNumber, guardianName, age } = req.body;

    // Find the student by ID and update the fields
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { firstName, surname, address, phoneNumber, guardianName, age },
      { new: true }
    );

    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update student', error });
  }
};

export { addStudent, deleteStudent, updateStudent };
