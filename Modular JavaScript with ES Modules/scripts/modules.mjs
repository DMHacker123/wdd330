import byuiCourse from "./course.mjs";
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from "./output.mjs";

byuiCourse.changeEnrollment = function (sectionNumber, add = true) {
  const sectionIndex = this.sections.findIndex(
    (section) => section.sectionNumber == sectionNumber
  );
  if (sectionIndex >= 0) {
    if (add) {
      this.sections[sectionIndex].enrolled++;
    } else {
      this.sections[sectionIndex].enrolled--;
    }
  }
};

document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);
