package org.o7planning.restfulcrud.service;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.o7planning.restfulcrud.dao.JobDAO;
import org.o7planning.restfulcrud.model.Job;

@Path("/jobs")
public class JobService {
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON})
	public List<Job> getJobs_JSON(){
		List<Job> jobs = JobDAO.getAllJobs();
		return jobs;
	}
	
	@GET
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON})
	public Job getJob(@PathParam("id") String id) {
		Job job = JobDAO.getJob(id);
		return job;
	}
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Job addJob(Job job) {
		return JobDAO.addJob(job);
	}
	
	@PUT
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Job updateJob(Job job) {
		return JobDAO.updateJob(job);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void deleteJob(@PathParam("id") String id) {
		JobDAO.deleteJob(id);
	}
}
