package org.o7planning.restfulcrud.dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.o7planning.restfulcrud.model.Job;

public class JobDAO {
	private static List<Job> jobsQueue = new ArrayList<Job>();
	
	static {
		initJobs();
	}
	
	//init jobs from file 
	private static void initJobs() {
		importJobs();
	}
	
	//For test clear list
	public static void clearQueue() {
		jobsQueue = new ArrayList<Job>();
	}
	
	//import jobs from file
	public static void importJobs() {
			BufferedReader br;
			try {
				br = new BufferedReader(new FileReader("jobs.txt"));
			    String line = br.readLine();

			    while (line != null) {
			        String[] jobField = line.split(",");
			        Job importJob = new Job(jobField[0], jobField[1], jobField[2], jobField[3]);
			        jobsQueue.add(importJob);
			        line = br.readLine();
			    }
			    br.close();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	
	}
	
	//save the jobs to file
	static void exportJobs() {
		PrintWriter writer;
		try {
			writer = new PrintWriter("jobs.txt", "UTF-8");
			for(Job entry: jobsQueue) {
			writer.println(entry.getId()+"," 
					 + entry.getName()+"," 
					 + entry.getDuration() + "," 
					 + entry.getStatus());
			}
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	//if this is the first job in the queue the status is "printing", else "queued"
	public static Job addJob(Job job) {
		if(jobsQueue.isEmpty()) {
			job.setStatus("printing");
		}
		jobsQueue.add(job);
		return job;
	}
	
	public static Job getJob(String id) {
		Job jobToFind = new Job(id);
		int indexToFind = jobsQueue.indexOf(jobToFind);
		if(indexToFind > -1)
			return jobsQueue.get(indexToFind);
		return null;
	}
	
	public static Job updateJob(Job job) {
		int index = jobsQueue.indexOf(job);
		jobsQueue.set(index, job);
		return job;
	}
	
	public static void deleteJob(String id) {
		Job jobToDelete = new Job(id);
		jobsQueue.remove(jobToDelete);
	}
	
	public static void cancelPrintingJob(String id) {
		Job jobToDelete = new Job(id);
		jobsQueue.remove(jobToDelete);
	}
	
	//to reorder the jobsQueue, get the new queue from the client
	public static void reorder(List<Job> jobs) {
		jobsQueue = (ArrayList<Job>) jobs;
	}
	
	//this function move up or down the current job(replace with another job)
	public static void moveJob(Job job, boolean isUp) {
		if(job != null) {
			if(job.getStatus() == "printing") {
				System.out.println("This job is printing");
				return;
			}
			int jobIndex = jobsQueue.indexOf(job);
			int newIndex;
			if(!isUp && jobIndex + 1 < jobsQueue.size()) {
				newIndex = jobIndex +1;
			}
			else if (jobIndex > 1){
				newIndex = jobIndex -1;
			}
			else return;
			
			Job jobToReplace = jobsQueue.get(newIndex);
			jobsQueue.set(newIndex, job);
			jobsQueue.set(jobIndex, jobToReplace);
		}
	}
	
	//return the queue of jobs
	public static List<Job> getAllJobs(){
		return jobsQueue;
	}
}
