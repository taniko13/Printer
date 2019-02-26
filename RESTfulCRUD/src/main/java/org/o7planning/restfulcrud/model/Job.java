package org.o7planning.restfulcrud.model;

/*
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "job")
@XmlAccessorType(XmlAccessType.FIELD)
*/
public class Job {
	//Fields
	private String id;
	private String name;
	private int duration;
	private String status;
	
	//Constructors
	public Job(){}
	
	public Job(String id) {
		this.id = id;
		this.name = "";
		this.duration = 0;
		this.status = "";
	}
	
	public Job(String id, String name, int duration, String status) {
		this.id = id;
		this.name = name;
		this.duration = duration;
		this.status = status;
	}
	public Job(String id, String name, String duration, String status) {
		this.id = id;
		this.name = name;
		this.duration = Integer.parseInt(duration);
		this.status = status;
	}
	
	
	//Getters
	public String getId() {
		return this.id;
	}
	
	public String getName() {
		return this.name;
	}
	
	public int getDuration() {
		return this.duration;
	}
	
	public String getStatus() {
		return this.status;
	}
	
	//Setters
	public void setId(String id) {
		this.id = id;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	// Overriding equals() to compare two Complex objects 
    @Override
    public boolean equals(Object  o) { 
  
        // If the object is compared with itself then return true   
        if (o == this) { 
            return true; 
        } 
  
        /* Check if o is an instance of Job or not 
          "null instanceof [type]" also returns false */
        if (!(o instanceof Job)) { 
            return false; 
        } 
          
        // typecast o to Job so that we can compare data members  
        Job job = (Job) o; 
        // Compare the ids and return accordingly
        return id.equals(job.getId()); 
    } 
}
