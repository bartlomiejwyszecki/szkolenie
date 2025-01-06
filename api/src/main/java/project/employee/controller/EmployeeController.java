package project.employee.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    @RequestMapping(name = "/employee/{id}"`, method = RequestMethod.GET)
    public String getEmployeeById(@PathVariable String id) {
        return "Employee " + id;
    }
}
