class nodejs::yeoman {
	
	exec {
		["install-yeoman"]: 
			unless => "/usr/bin/ls /tmp/yeoman.done | grep yeoman.done ",
			command => "/usr/bin/npm install -g yo bower grunt-cli gulp && /usr/bin/touch /tmp/yeoman.done",
			require => Package["npm"],
	}

}