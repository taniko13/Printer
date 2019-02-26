import static org.junit.Assert.*;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import org.o7planning.restfulcrud.dao.JobDAO;
import org.o7planning.restfulcrud.model.Job;

public class TestJobDAO {

	@BeforeClass
	public static void initJobs() {
		JobDAO.clearQueue();
		JobDAO.importJobs();
	}
	
	@Test
	public void testGetJob() {
		Job job = JobDAO.getJob("d3b12625-7573-4ec8-a831-47ac0617978a");
		assertEquals(job.getId(), "d3b12625-7573-4ec8-a831-47ac0617978a");
	}
	
	@Test
	public void testGetAllJobs() {
		List<Job> allJobs = JobDAO.getAllJobs();
		assertEquals(allJobs.size(), 8);
	}
	
	@Test
	public void testAddJob() {
		Job newJob = new Job("f9154d34-f0a1-43d3-ba32-86942094995", "New Job", 90, "queued");
		JobDAO.addJob(newJob);
		Job job = JobDAO.getJob("f9154d34-f0a1-43d3-ba32-86942094995");
		assertEquals(job.getName(), "New Job");
		assertEquals(JobDAO.getAllJobs().size(), 8);
	}
	
	
	@Test
	public void testDeleteJob() {
		JobDAO.deleteJob("f9154d34-f0a1-43d3-ba32-869420949bed");
		Job job = JobDAO.getJob("f9154d34-f0a1-43d3-ba32-869420949bed");
		assertNull(job);
		assertEquals(JobDAO.getAllJobs().size(), 7);
	}
	
	//d3b12625-7573-4ec8-a831-47ac0617978a
	@Test
	public void testMoveJobDown() {
		String id = "d3b12625-7573-4ec8-a831-47ac0617978a";
		Job jobToMove = JobDAO.getJob(id);
		List<Job> allJobs = JobDAO.getAllJobs();
		int i = allJobs.indexOf(jobToMove);
		JobDAO.moveJob(jobToMove, false);
		allJobs = JobDAO.getAllJobs();
		int newI = allJobs.indexOf(jobToMove);
		assertEquals(newI, i+1);
	}
	//452a10ce-168b-4d84-ad76-cae661a282f4
	@Test
	public void testMoveJobUp() {
		String id = "452a10ce-168b-4d84-ad76-cae661a282f4";
		Job jobToMove = JobDAO.getJob(id);
		List<Job> allJobs = JobDAO.getAllJobs();
		int i = allJobs.indexOf(jobToMove);
		JobDAO.moveJob(jobToMove, true);
		allJobs = JobDAO.getAllJobs();
		int newI = allJobs.indexOf(jobToMove);
		assertEquals(newI, i-1);
	}
}
