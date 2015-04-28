class nodejs::yeoman {
	
	exec {
		["install-yeoman"]: 
			unless 	=> "/usr/bin/ls /tmp/yeoman.done | grep yeoman.done ",
			command => "/usr/bin/npm install -g yo bower grunt-cli gulp && /usr/bin/touch /tmp/yeoman.done",
			require => Package["npm"],
	}

	exec {
		["install-generator-webapp"]:
			unless 	=> "/usr/bin/ls /tmp/generator-webapp.done | grep generator-webapp.done ",
			command => "/usr/bin/npm install -g generator-webapp && /usr/bin/touch /tmp/generator-webapp.done",
			require => Package["npm"],
	}

	exec {
		["install-generator-angular"]:
			unless 	=> "/usr/bin/ls /tmp/generator-angular.done | grep generator-angular.done ",
			command => "/usr/bin/npm install -g generator-angular && /usr/bin/touch /tmp/generator-angular.done",
			require => Package["npm"],
	}

}