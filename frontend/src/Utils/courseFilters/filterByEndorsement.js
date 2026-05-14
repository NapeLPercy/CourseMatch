/*
1 Filter courses by endorsement
 e.g
 1.1 Barchelor qualifies for Barchelor/Diploma/Certficate
 1.2 Diploma qualifies for Diploma/Certficate
 1.3 certificate qualifies for Certificate
 */
export default function filterCoursesByEndorsement(
  qualifications,
  studentEndorsement,
) {
  
  return qualifications.filter((q) => {
    const min = q.minimum_endorsement;

    if (min === "Certificate") {
      return ["Certificate", "Diploma", "Bachelor"].includes(
        studentEndorsement,
      );
    }
    if (min === "Diploma") {
      return ["Diploma", "Bachelor"].includes(studentEndorsement);
    }
    if (min === "Bachelor") {
      return studentEndorsement === "Bachelor";
    }

    return false;
  });
}
